import { cn } from "@workspace/ui/lib/utils";
import { ArrowRightIcon, ArrowUpIcon, CheckIcon } from "lucide-react";

interface ConversationIconsProps {
  status: "unresolved" | "escalated" | "resolved";
  className?: string;
}

const statusConfig = {
  unresolved: {
    icon: ArrowRightIcon,
    bgColor: "bg-destructive",
  },
  escalated: { icon: ArrowUpIcon, bgColor: "bg-yellow-300" },
  resolved: { icon: CheckIcon, bgColor: "bg-[#3FB62F]" },
} as const;

export const ConversationStatusIcon = ({
  status,
  className,
}: ConversationIconsProps) => {
  const config = statusConfig[status];
  const Icon = statusConfig[status].icon;

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full size-5",
        config.bgColor,
        className
      )}
    >
      <Icon className="size-3 stroke-3 text-white" />
    </div>
  );
};
