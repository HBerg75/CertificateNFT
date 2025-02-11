"use client";

import { Badge } from "@/components/ui/badge";
import { useHasRoleCertIssuer } from "@/lib/hook";

export default function AdminTitle() {
  const isCertIssuer = useHasRoleCertIssuer();
  return (
    <h1 className="text-3xl font-bold mb-6 flex gap-4 items-center">
      Admin interface
      {isCertIssuer && <Badge variant="outline">CertIssuer</Badge>}
    </h1>
  );
}
