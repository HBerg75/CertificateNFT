import { isAdmin } from "@/lib/certificates.action";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export function useHasRoleAdmin() {
  const { address, isDisconnected } = useAccount();
  const [hasRoleAdmin, setHasRoleAdmin] = useState<boolean>(false);

  useEffect(() => {
    if (!address) return;
    isAdmin(address).then((hasRoleAdmin: boolean) =>
      setHasRoleAdmin(hasRoleAdmin),
    );
  }, [address, isDisconnected]);

  return hasRoleAdmin;
}
