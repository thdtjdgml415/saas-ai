import { ConvexError, v } from "convex/values";
import { components, internal } from "../_generated/api";
import { action, mutation, query } from "../_generated/server";
import { supportAgent } from "../system/ai/agents/supportAgent";
import { paginationOptsValidator } from "convex/server";
import { saveMessage } from "@convex-dev/agent";
import { threadId } from "worker_threads";

/**
 * @purpose 내부 직원(예: 지원팀)의 메시지를 생성(전송)합니다.
 * @description 지원팀 직원이 대시보드에서 고객의 문의에 답변을 작성하고 보낼 때 호출됩니다.
 *              `public/messages.ts`의 `create`와 달리, 로그인된 직원의 권한을 확인하여 내부 사용자임을 인증합니다.
 * @caller 내부 대시보드 (지원팀)
 */
export const create = mutation({
  args: {
    prompt: v.string(),
    conversationId: v.id("conversations"),
  },
  handler: async (ctx, args) => {
    const identify = await ctx.auth.getUserIdentity();

    if (identify === null) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Identify not found",
      });
    }

    const orgId = identify.org_id as string;

    if (!orgId) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Organization not found",
      });
    }

    const conversation = await ctx.db.get(args.conversationId);

    if (conversation?.organizationId !== orgId) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Invalid organizationId",
      });
    }

    if (!conversation) {
      throw new ConvexError({
        code: "NOT_FOUND",
        message: "Converstion not found",
      });
    }

    if (conversation.status === "resolved") {
      throw new ConvexError({
        code: "BAD_REQUEST",
        message: "Converstion resolved",
      });
    }

    await saveMessage(ctx, components.agent, {
      threadId: conversation.threadId,
      // TODO: 에이전트 이름이 필요한지 확인
      agentName: identify.familyName,
      message: {
        content: args.prompt,
        role: "assistant",
      },
    });
  },
});

export const getMany = query({
  args: {
    threadId: v.string(),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const identify = await ctx.auth.getUserIdentity();

    if (identify === null) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Identify not found",
      });
    }

    const orgId = identify.org_id as string;

    if (!orgId) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Organization not found",
      });
    }

    const conversation = await ctx.db
      .query("conversations")
      .withIndex("by_thread_id", (q) => q.eq("threadId", args.threadId))
      .unique();

    if (!conversation) {
      throw new ConvexError({
        code: "NOT_FOUND",
        message: "Conversations not found",
      });
    }

    if (conversation.organizationId !== orgId) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Invalid organizationId",
      });
    }

    // agent에서 이미 userId를 이용해 연동함
    const paginated = await supportAgent.listMessages(ctx, {
      threadId: args.threadId,
      paginationOpts: args.paginationOpts,
    });

    return paginated;
  },
});
