import { openai } from "@ai-sdk/openai";
import { Agent } from "@convex-dev/agent";
import { components } from "../../../_generated/api";
import { google } from "@ai-sdk/google";

export const supportAgent = new Agent(components.agent, {
  name: "Support Agent",
  chat: google.chat("gemini-2.5-flash"),
});

// export const supportAgent = new Agent(components.agent, {
//   name: "Support Agent",
//   chat: openai.chat("gpt-5"),
// });
