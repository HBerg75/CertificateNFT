"use client";
import { BreadcrumbPage } from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

export default function BreadcrumbCurrent() {
  const pathname = usePathname();

  return (
    <BreadcrumbPage>
      {pathname === "/" ? "Certificates" : "Admin"}
    </BreadcrumbPage>
  );
}
