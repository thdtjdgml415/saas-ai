"use node";

import * as Sentry from "@sentry/node";
import { v } from "convex/values";
import { internalAction } from "./_generated/server";

// DSN이 제공된 경우 Sentry를 초기화합니다.
if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1.0,
  });
}

export const logSentryError = internalAction({
  args: {
    errorMessage: v.string(),
    errorStack: v.optional(v.string()),
    errorData: v.optional(v.any()),
    identity: v.optional(v.any()),
    functionArgs: v.optional(v.any()),
  },
  handler: async (_, { errorMessage, errorStack, errorData, identity, functionArgs }) => {
    if (!process.env.SENTRY_DSN) {
      return;
    }

    const error = new Error(errorMessage);
    if (errorStack) {
      error.stack = errorStack;
    }

    Sentry.withScope(async (scope) => {
      if (identity) {
        scope.setUser({
          id: identity.subject,
          email: identity.email,
          name: identity.name,
        });
        scope.setTag("user_id", identity.subject);
      }

      if (functionArgs) {
        scope.setExtra("function_arguments", functionArgs);
      }

      if (errorData) {
        scope.setExtra("convex_error_data", errorData);
      }

      Sentry.captureException(error);
    });

    await Sentry.flush(2000);
  },
});
