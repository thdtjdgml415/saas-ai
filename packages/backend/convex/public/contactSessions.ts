import { v } from "convex/values";
import { mutation } from "../_generated/server";

const SESSION_DURATION_MS = 24 * 60 * 60 * 1000;

/**
 * @purpose 새로운 연락 세션(contact session)을 생성합니다.
 * @description 고객이 처음 채팅 위젯을 통해 이름과 이메일을 입력하고 대화를 시작할 때 호출됩니다.
 *              이 API는 고객을 식별하고 일정 시간 동안 유지되는 세션을 만들어 `contactSessionId`를 반환합니다.
 * @caller 채팅 위젯 (고객)
 */
export const create = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    organizationId: v.string(),
    metadata: v.optional(
      v.object({
        userAgent: v.optional(v.string()),
        language: v.optional(v.string()),
        languages: v.optional(v.optional(v.optional(v.string()))),
        platform: v.optional(v.string()),
        vendor: v.optional(v.string()),
        screenResolution: v.optional(v.string()),
        viewportSize: v.optional(v.string()),
        timezone: v.optional(v.string()),
        timezoneOffset: v.optional(v.number()),
        cookieEnabled: v.optional(v.boolean()),
        referrer: v.optional(v.string()),
        currentUrl: v.optional(v.string()),
      })
    ),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const expiresAt = now + SESSION_DURATION_MS;

    const contactSessionId = await ctx.db.insert("contactSessions", {
      name: args.name,
      email: args.email,
      organizationId: args.organizationId,
      expiresAt,
      metadata: args.metadata,
    });

    return contactSessionId;
  },
});

export const validate = mutation({
  args: {
    contactSessionId: v.id("contactSessions"),
  },
  handler: async (ctx, args) => {
    const contactSession = await ctx.db.get(args.contactSessionId);
    if (!contactSession) {
      return {
        valid: false,
        reason: "세션을 찾을 수 없음",
      };
    }
    if (contactSession.expiresAt < Date.now()) {
      return {
        valid: false,
        reason: "세션이 만료되었음",
      };
    }

    return {
      valid: true,
      contactSession,
    };
  },
});
