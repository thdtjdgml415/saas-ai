"use client";

import { useAtomValue } from "jotai";
import { errorMessageAtom } from "@/modules/atom/widget-atoms";
import { WidgetHeader } from "@/modules/ui/components/widget-header";
import { AlertTriangleIcon } from "lucide-react";
export const WidgetErrorScreen = () => {
  const errorMessage = useAtomValue(errorMessageAtom);

  return (
    <>
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-2 px-2 py-6">
          <p className="font-semibold text-3xl">안녕하세요! 👋</p>
          <p className="font-semibold text-lg">무엇을 도와드릴까요?</p>
        </div>
      </WidgetHeader>
      <div className="flex flex-1 flex-col items-center justify-center gap-y-4 p-4 text-muted-foreground">
        <AlertTriangleIcon />
        <p className="text-sm">{errorMessage || "유효한 상태가 아닙니다."}</p>
      </div>
    </>
  );
};
