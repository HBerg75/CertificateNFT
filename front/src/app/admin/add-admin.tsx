"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";

import { useWriteAcademicCertificateNftGrantRole } from "@/generated";
import { getDefaultAdminRole } from "@/lib/certificates.action";
import { isValidAddress } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";
import {
  type BaseError,
  useAccount,
  useWaitForTransactionReceipt,
} from "wagmi";

export default function AddAdmin() {
  const { address } = useAccount();

  const [newAdminAddress, setNewAdminAddress] = useState<string>("");
  const {
    data: hash,
    error,
    isPending,
    writeContract,
  } = useWriteAcademicCertificateNftGrantRole();

  const {
    isLoading,
    isSuccess,
    isError,
    error: transacRevertErr,
  } = useWaitForTransactionReceipt({ hash });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("clicked");
    if (!isValidAddress(newAdminAddress)) {
      toast.error("Invalid address");
      return;
    }

    writeContract({
      args: [await getDefaultAdminRole(), newAdminAddress],
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add new admin</CardTitle>
        <CardDescription>Grant admin role to a new address</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="address">Ethereum Address</Label>
              <Input
                id="address"
                placeholder="0x..."
                value={newAdminAddress}
                onChange={(e) => setNewAdminAddress(e.target.value)}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={(e) => handleSubmit(e)} disabled={isPending}>
          {isPending
            ? "Approving request..."
            : isLoading
              ? "Granting..."
              : "Grant Admin Role"}
        </Button>
      </CardFooter>
      {error && (
        <Alert variant="destructive" className="mx-6 mb-6 w-fit">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {transacRevertErr?.message || "Transaction revert"}
          </AlertDescription>
        </Alert>
      )}
      {isError && (
        <Alert variant="destructive" className="mx-6 mb-6 w-fit">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {(error as BaseError).shortMessage || error?.message}
          </AlertDescription>
        </Alert>
      )}
      {isSuccess && (
        <Alert variant="default" className="mx-6 mb-6 w-fit">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>
            Admin role granted to {newAdminAddress}
          </AlertDescription>
        </Alert>
      )}
    </Card>
  );
}
