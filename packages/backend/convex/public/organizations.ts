import { createClerkClient } from "@clerk/backend";
import { v } from "convex/values";
import { action } from "../_generated/server";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY || "",
});

export const validate = action({
  args: {
    organizationId: v.string(),
  },
  handler: async (_, args) => {
    console.log(args.organizationId);
    try {
      await clerkClient.organizations.getOrganization({
        organizationId: args.organizationId,
      });

      return {
        valid: true,
      };
    } catch (error) {
      console.error(error);
      return { valid: false, reason: "Organization not found" };
    }
  },
});
