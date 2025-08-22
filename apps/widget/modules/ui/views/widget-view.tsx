"use client";

import { screenAtom } from "@/modules/atom/widget-atoms";
import { WidgetAuthScreen } from "@/modules/ui/screens/widget-auth-screen";
import { useAtomValue } from "jotai";

interface Props {
  organizationId: string;
}

export const WidgetView = ({ organizationId }: Props) => {
  const screen = useAtomValue(screenAtom);

  const screenComponents = {
    loading: <p>loading</p>,
    error: <p>error</p>,
    voice: <p>voice</p>,
    chat: <p>chat</p>,
    inbox: <p>inbox</p>,
    selection: <p>selection</p>,
    contact: <p>contact</p>,
    auth: <WidgetAuthScreen />,
  };
  return (
    // TODO: min-h-screen을 사용하지 않고 중간 속성을 채워야함
    <main className="min-h-screen min-w-screen flex h-full w-full flex-col overflow-hidden rounded-xl border bg-muted">
      {screenComponents[screen]}
      {/* <WidgetFooter /> */}
    </main>
  );
};
