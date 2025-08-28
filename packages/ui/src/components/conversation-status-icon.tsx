import { ArrowRightCircleIcon, ArrowUpIcon, CheckIcon } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";

interface ConversationIconsProps {
  status: "unresolved" | "escalated" | "resolved";
  className: string;
}

const statusConfig = {
  unresolved: {
    icon: CheckIcon,
    bgColor: "bg-[#3FB62F]",
  },
  escalated: { icon: ArrowRightCircleIcon, bgColor: "bg-destructive" },
  resolved: { icon: ArrowUpIcon, bgColor: "bg-yellow-500" },
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
