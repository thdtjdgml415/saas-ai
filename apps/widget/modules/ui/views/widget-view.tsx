"use client";

import { screenAtom } from "@/modules/atom/widget-atoms";
import { WidgetAuthScreen } from "@/modules/ui/screens/widget-auth-screen";
import { WidgetErrorScreen } from "@/modules/ui/screens/widget-error-screen";
import { useAtomValue } from "jotai";
import { WidgetLoadingScreen } from "@/modules/ui/screens/widget-loading-screen";
import { WidgetSelectionScreen } from "@/modules/ui/screens/widget-selection-screen";
import { WidgetChatScreen } from "@/modules/ui/screens/widget-chat-screen";

interface Props {
  organizationId: string | null;
}

export const WidgetView = ({ organizationId }: Props) => {
  const screen = useAtomValue(screenAtom);

  const screenComponents = {
    loading: <WidgetLoadingScreen organizationId={organizationId} />,
    error: <WidgetErrorScreen />,
    voice: <p>voice</p>,
    chat: <WidgetChatScreen />,
    inbox: <p>inbox</p>,
    selection: <WidgetSelectionScreen />,
    contact: <p>contact</p>,
    auth: <WidgetAuthScreen />,
  };
  return (
    // TODO: min-h-screen을 사용하지 않고 중간 속성을 채워야함
    <main className="min-h-screen min-w-screen flex h-full w-full flex-col overflow-hidden rounded-xl border bg-muted">
      {screenComponents[screen]}
    </main>
  );
};
