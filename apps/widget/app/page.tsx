"use client";

import { useVapi } from "@/module/hooks/widget/use-vapi";
import { Button } from "@workspace/ui/components/button";

export default function Page() {
  const {
    endCall,
    isConnected,
    isConnecting,
    isSpeaking,
    startCall,
    transcript,
  } = useVapi();

  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <p className="text-2xl font-bold">Hello widget</p>
      <Button onClick={() => startCall()}>call</Button>
      <Button onClick={() => endCall()} variant={"destructive"}>
        end
      </Button>
      <p>isConnected: {`${isConnected}`}</p>
      <p>isConnecting:{`${isConnecting}`}</p>
      <p>isSpeaking: {`${isSpeaking}`}</p>
      <p>{`${JSON.stringify(transcript, null, 2)}`}</p>
    </div>
  );
}
