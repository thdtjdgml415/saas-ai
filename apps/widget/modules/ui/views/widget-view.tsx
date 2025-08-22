"use client";

// import { WidgetFooter } from "../components/widget-footer";
// import { WidgetHeader } from "../components/widget-header";
import { WidgetAuthScreen } from "@/modules/ui/screens/widget-auth-screen";

interface Props {
  organizationId: string;
}

export const WidgetView = ({ organizationId }: Props) => {
  return (
    // TODO: min-h-screen을 사용하지 않고 중간 속성을 채워야함
    <main className="min-h-screen min-w-screen flex h-full w-full flex-col overflow-hidden rounded-xl border bg-muted">
      <WidgetAuthScreen />
      {/* <WidgetFooter /> */}
    </main>
  );
};
