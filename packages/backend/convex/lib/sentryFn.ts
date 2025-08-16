import { ConvexError, PropertyValidators } from "convex/values";
import { mutation, MutationCtx, query, QueryCtx } from "../_generated/server";
import { internal } from "../_generated/api";

// 쿼리 또는 뮤테이션에 전달되는 정의 객체에 대한 제네릭 타입입니다.
type FunctionDefinition<Ctx, Args extends PropertyValidators, Output> = {
  args: Args;
  handler: (ctx: Ctx, args: any) => Output | Promise<Output>;
};

/**
 * Sentry 오류 보고 기능으로 Convex 쿼리 정의를 감싸고 타입을 보존합니다.
 * @param definition args 및 handler를 포함한 쿼리 정의 객체입니다.
 * @returns Sentry 오류 보고 기능이 추가된 새로운 쿼리 함수입니다.
 */
export const sentryQuery = <Args extends PropertyValidators, Output>(
  definition: FunctionDefinition<QueryCtx, Args, Output>
) => {
  return query({
    args: definition.args,
    handler: async (ctx, ...args) => {
      try {
        return await definition.handler(ctx, args);
      } catch (e) {
        await captureSentryException(e, ctx, args);
        throw e; // 클라이언트 측 동작에 영향을 주지 않도록 오류를 다시 던집니다.
      }
    },
  });
};

/**
 * Sentry 오류 보고 기능으로 Convex 뮤테이션 정의를 감싸고 타입을 보존합니다.
 * @param definition args 및 handler를 포함한 뮤테이션 정의 객체입니다.
 * @returns Sentry 오류 보고 기능이 추가된 새로운 뮤테이션 함수입니다.
 */
export const sentryMutation = <Args extends PropertyValidators, Output>(
  definition: FunctionDefinition<MutationCtx, Args, Output>
) => {
  return mutation({
    args: definition.args,
    handler: async (ctx, ...args) => {
      try {
        return await definition.handler(ctx, args);
      } catch (e) {
        await captureSentryException(e, ctx, args);
        throw e;
      }
    },
  });
};

async function captureSentryException(
  e: unknown,
  ctx: QueryCtx | MutationCtx,
  args: unknown
) {
  try {
    if (!process.env.SENTRY_DSN) {
      return;
    }

    const identity = await ctx.auth.getUserIdentity().catch(() => undefined);
    const errorData = e instanceof ConvexError ? e.data : undefined;
    const errorMessage = e instanceof Error ? e.message : String(e);
    const errorStack = e instanceof Error ? e.stack : undefined;

    if ("scheduler" in ctx && ctx.scheduler) {
      await ctx.scheduler.runAfter(0, internal.sentry.logSentryError, {
        errorMessage,
        errorStack,
        errorData,
        identity,
        functionArgs: args,
      });
    } else {
      // QueryCtx 폴백: 스케줄러가 없으면 서버 로그로 남깁니다.
      console.error("[sentryFn] Query error (scheduler unavailable)", {
        errorMessage,
        errorStack,
        errorData,
      });
    }
  } catch {
    // 로깅 과정의 모든 오류는 삼켜 원래 예외를 가리지 않도록 합니다.
  }
}
