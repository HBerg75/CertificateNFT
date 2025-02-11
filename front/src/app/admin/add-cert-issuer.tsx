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
import { getCertificateIssuerRole } from "@/lib/certificates.action";
import { isValidAddress } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";
import { type BaseError, useWaitForTransactionReceipt } from "wagmi";

export default function AddCertIssuer() {
  const [newIssuerAddress, setNewIssuerAddress] = useState<string>("");
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

    if (!isValidAddress(newIssuerAddress)) {
      toast.error("Invalid address");
      return;
    }

    writeContract({
      args: [await getCertificateIssuerRole(), newIssuerAddress],
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add new certificate issuer</CardTitle>
        <CardDescription>
          Grant certification issuer role to a new address
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="address">Ethereum Address</Label>
              <Input
                id="address"
                placeholder="0x..."
                value={newIssuerAddress}
                onChange={(e) => setNewIssuerAddress(e.target.value)}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4 justify-start items-start">
        <Button onClick={(e) => handleSubmit(e)} disabled={isPending}>
          {isPending
            ? "Approving request..."
            : isLoading
              ? "Granting..."
              : "Grant Admin Role"}
        </Button>
        {isError && (
          <Alert variant="destructive" className="w-full">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {transacRevertErr?.message || "Transaction revert"}
            </AlertDescription>
          </Alert>
        )}
        {error && (
          <Alert variant="destructive" className="w-full">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {(error as BaseError).shortMessage || error?.message}
            </AlertDescription>
          </Alert>
        )}
        {isSuccess && (
          <Alert variant="default" className="w-full">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>
              Admin role granted to {newIssuerAddress}
            </AlertDescription>
          </Alert>
        )}
      </CardFooter>
    </Card>
  );
}
