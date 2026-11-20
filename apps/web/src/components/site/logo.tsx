import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      {/* Dark logo: shown in light mode, hidden in dark mode */}
      <Image
        src="/logo-dark-1.png"
        alt="linguisticPro logo"
        width={170}
        height={125}
        priority
        className="block dark:hidden"
      />
      {/* White logo: hidden in light mode, shown in dark mode */}
      <Image
        src="/logo-white-1.png"
        alt=""
        aria-hidden
        width={170}
        height={125}
        priority
        className="hidden dark:block"
      />
    </Link>
  );
}