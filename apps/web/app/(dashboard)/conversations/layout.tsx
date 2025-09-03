import { ConversationLayout } from "@/modules/dashboard/ui/layouts/conversation-layout";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <ConversationLayout>{children}</ConversationLayout>;
};

export default layout;
