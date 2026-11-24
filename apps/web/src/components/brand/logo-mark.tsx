import Image from "next/image";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src="/app-icon.png"
      alt="linguisticPro"
      width={178}
      height={178}
      className={cn("rounded-3xl object-contain shadow-glow", className)}
    />
  );
}