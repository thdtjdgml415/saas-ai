"use client";

import { glass } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";

import { useMemo } from "react";
import { cn } from "@workspace/ui/lib/utils";
import { Avatar, AvatarImage } from "@workspace/ui/components/avatar";

interface DicebearAvatarPorps {
  seed: string;
  size: number;
  className?: string;
  badgeClassName?: string;
  imageUrl?: string;
  badgeImageUrl?: string;
}

export const DicebearAvatar = ({
  seed,
  size,
  className,
  badgeClassName,
  imageUrl,
  badgeImageUrl,
}: DicebearAvatarPorps) => {
  const avatarSrc = useMemo(() => {
    if (imageUrl) {
      return imageUrl;
    }

    const avatar = createAvatar(glass, {
      seed: seed.toLowerCase().trim(),
      size,
    });
    return avatar.toDataUri();
  }, [size, seed, imageUrl]);

  const badgeSize = Math.round(size * 0.5);

  return (
    <div
      className="relative inline-block"
      style={{ width: size, height: size }}
    >
      <Avatar className={cn("border", className)}>
        <AvatarImage alt="IAvatar" src={avatarSrc} />
      </Avatar>
      {badgeImageUrl && (
        <div
          className={cn(
            "absolute right-0 bottom-0 items-center justify-center overflow-hidden",
            "rounded-full border-2 border-background bg-background",
            badgeClassName
          )}
          style={{
            width: badgeSize,
            height: badgeSize,
            transform: "translate(15%, 15%)",
          }}
        >
          <img
            src={badgeImageUrl}
            alt="Badge"
            height={badgeSize}
            width={badgeSize}
            className="h-full w-full object-cover"
          />
        </div>
      )}
    </div>
  );
};
