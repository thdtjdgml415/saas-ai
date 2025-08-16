import { v } from "convex/values";
import { sentryMutation, sentryQuery } from "./lib/sentryFn";

export const getMany = sentryQuery({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    return users;
  },
});

export const add = sentryMutation({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    console.log(identity, "----------------", args);
    if (identity === null) {
      throw new Error("Not authenticated");
    }
    const orgId = identity.org_id as string;

    if (!orgId) {
      throw new Error("Not in an organization");
    }

    const userId = await ctx.db.insert("users", { name: args[0].name });
    return userId;
  },
});
