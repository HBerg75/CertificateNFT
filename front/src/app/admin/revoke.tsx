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

import { useWriteAcademicCertificateNftRevokeCertificate } from "@/generated";
import { useState } from "react";
import { type BaseError, useWaitForTransactionReceipt } from "wagmi";

export default function Revoke() {
  const [certIdToRevoke, setCertIdToRevoke] = useState<number>(0);
  const [reason, setReason] = useState<string>("");
  const {
    data: hash,
    error,
    isPending,
    writeContract,
  } = useWriteAcademicCertificateNftRevokeCertificate();

  const {
    isLoading,
    isSuccess,
    isError,
    error: transacRevertErr,
  } = useWaitForTransactionReceipt({ hash });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    writeContract({
      args: [BigInt(certIdToRevoke), reason],
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revoke certificate</CardTitle>
        <CardDescription>
          Revoke student certificate with reason why
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="address">Certification ID to revoke</Label>
            <Input
              id="address"
              type="number"
              value={certIdToRevoke}
              onChange={(e) => setCertIdToRevoke(Number(e.target.value))}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="address">Reason to revoke</Label>
            <Input
              id="address"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4 justify-start items-start">
        <Button onClick={(e) => handleSubmit(e)} disabled={isPending}>
          {isPending
            ? "Approving request..."
            : isLoading
              ? "Revoking..."
              : "Revoke certificate"}
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
              Certificate ID {certIdToRevoke} has been revoked
            </AlertDescription>
          </Alert>
        )}
      </CardFooter>
    </Card>
  );
}
