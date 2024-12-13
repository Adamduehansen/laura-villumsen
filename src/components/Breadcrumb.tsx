"use client";

import { usePathname } from "next/navigation";

export default function Breadcrumb() {
  const pathname = usePathname();

  return (
    <p className="z-20">
      <span className="inline lg:hidden">/</span>Portfolio
    </p>
  );
}
