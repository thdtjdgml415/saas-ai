"use client";

import {
  contactSessionIdAtomFamily,
  errorMessageAtom,
  loadingMessageAtom,
  organizationIdAtom,
  screenAtom,
} from "@/modules/atom/widget-atoms";
import { WidgetHeader } from "@/modules/ui/components/widget-header";
import { api } from "@workspace/backend/_generated/api";
import { Id } from "@workspace/backend/_generated/dataModel";
import { useAction, useMutation } from "convex/react";
import { useAtomValue, useSetAtom } from "jotai";
import { LoaderIcon } from "lucide-react";
import { useEffect, useState } from "react";

type InitStep = "org" | "session" | "setting" | "vapi" | "done";
export const WidgetLoadingScreen = ({
  organizationId,
}: {
  organizationId: string | null;
}) => {
  const [step, setStep] = useState<InitStep>("org");
  const [sessionValid, setSessionValid] = useState(false);

  const loadingMessage = useAtomValue(loadingMessageAtom);
  const setOrganizationId = useSetAtom(organizationIdAtom);
  const setErrorMessage = useSetAtom(errorMessageAtom);
  const setLoadingMessage = useSetAtom(loadingMessageAtom);
  const setScreen = useSetAtom(screenAtom);

  const contactSessionId = useAtomValue(
    contactSessionIdAtomFamily(organizationId || "")
  );

  const validateOrganization = useAction(api.public.organizations.validate);

  // 조직아이디 유효성 검사
  useEffect(() => {
    if (step !== "org") {
      return;
    }

    setLoadingMessage("조직아이디 확인중....");

    if (!organizationId) {
      setErrorMessage("유효한 조직 아이디가 아닙니다.");
      setLoadingMessage(null);
      setScreen("error");
      return;
    }
    let cancelled = false;
    validateOrganization({ organizationId })
      .then((result) => {
        if (cancelled) return;
        if (result.valid) {
          setLoadingMessage("유효한 조직 아이디 입니다.");
          setOrganizationId(organizationId);
          setStep("session");
        } else {
          setErrorMessage(result.reason || "유효한 구성원이 아닙니다.");
          setScreen("error");
        }
      })
      .catch(() => {
        if (cancelled) return;
        setErrorMessage("조직의 이름을 확인할 수 없습니다.");
        setLoadingMessage(null);
        setScreen("error");
      });
    return () => {
      cancelled = true;
    };
  }, [step, organizationId, validateOrganization]);

  const validateContactSession = useMutation(
    api.public.contactSessions.validate
  );

  // 유효한 세션 검사 (존재한다면)
  useEffect(() => {
    if (step !== "session") {
      return;
    }
    setLoadingMessage("유효한 세션 아이디 여부 확인중....");

    if (!contactSessionId) {
      setSessionValid(false);
      setStep("done");
      return;
    }

    setLoadingMessage("세션 검사중.....");
    validateContactSession({
      contactSessionId,
    })
      .then((result) => {
        setSessionValid(result.valid);
        setStep("done");
      })
      .catch(() => {
        setSessionValid(false);
        setStep("done");
      });
  }, [step, contactSessionId, validateContactSession]);

  useEffect(() => {
    if (step !== "done") {
      return;
    }
    const hasValidSession = contactSessionId && sessionValid;
    setScreen(hasValidSession ? "selection" : "auth");
  }, [step, contactSessionId, sessionValid]);

  return (
    <>
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-2 px-2 py-6">
          <p className="font-semibold text-3xl">안녕하세요! 👋</p>
          <p className="font-semibold text-lg">무엇을 도와드릴까요?</p>
        </div>
      </WidgetHeader>
      <div className="flex flex-1 flex-col items-center justify-center gap-y-4 p-4 text-muted-foreground">
        <LoaderIcon className="animate-spin" />
        <p className="text-sm animate-bounce">
          {loadingMessage || "Loading....."}
        </p>
      </div>
    </>
  );
};
