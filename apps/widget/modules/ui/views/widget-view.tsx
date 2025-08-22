"use client";

import { WidgetFooter } from "../components/widget-footer";
import { WidgetHeader } from "../components/widget-header";

interface Props {
  organizationId: string;
}

export const WidgetView = ({ organizationId }: Props) => {
  return (
    // TODO: min-h-screen을 사용하지 않고 중간 속성을 채워야함
    <main className="min-h-screen min-w-screen flex h-full w-full flex-col overflow-hidden rounded-xl border bg-muted">
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-2 px-2 py-6">
          <p className="font-semibold text-3xl">안녕하세요! 👋</p>
          <p className="font-semibold text-lg">무엇을 도와드릴까요?</p>
        </div>
      </WidgetHeader>
      <div className="flex flex-1">widget view {`${organizationId}`}</div>
      <WidgetFooter />
    </main>
  );
};
