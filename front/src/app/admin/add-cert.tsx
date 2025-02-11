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

import { useWriteAcademicCertificateNftMintCertificate } from "@/generated";
import { useHasRoleCertIssuer } from "@/lib/hook";
import { isValidAddress } from "@/lib/utils";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { BaseError, useWaitForTransactionReceipt } from "wagmi";
import { z } from "zod";

export default function AddCert() {
  const [formData, setFormData] = useState({
    recipient: "",
    studentFullName: "",
    studentId: "",
    diplomaTitle: "",
    academicGrade: "",
    metadataUri: "",
  });

  const {
    data: hash,
    error,
    isPending,
    writeContract,
  } = useWriteAcademicCertificateNftMintCertificate();

  const {
    isLoading,
    isSuccess,
    isError,
    error: transacRevertErr,
  } = useWaitForTransactionReceipt({ hash });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidAddress(formData.recipient)) {
      toast.error("Invalid address");
      return;
    }

    const formSchema = z.object({
      studentFullName: z.string().min(1, "Student full name is required"),
      studentId: z.string().min(1, "Student ID is required"),
      diplomaTitle: z.string().min(4, "Diploma title is required"),
      academicGrade: z.string().min(4, "Academic grade is required"),
      metadataUri: z.string().min(1, "Metadata URI is required"),
    });

    const result = formSchema.safeParse(formData);
    if (!result.success) {
      result.error.errors.forEach((err) => {
        toast.error(err.message);
      });
      return;
    }

    writeContract({
      args: [
        formData.recipient,
        formData.studentFullName,
        BigInt(formData.studentId),
        formData.diplomaTitle,
        formData.academicGrade,
        formData.metadataUri,
      ],
    });
  };

  const isCertIssuer = useHasRoleCertIssuer();
  if (!isCertIssuer) return;
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Mint Certificate</CardTitle>
        <CardDescription>
          Fill in the details to mint a new certificate
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="recipient">Recipient Address</Label>
          <Input
            id="recipient"
            name="recipient"
            value={formData.recipient}
            onChange={handleChange}
            placeholder="0x..."
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="studentFullName">Student Full Name</Label>
          <Input
            id="studentFullName"
            name="studentFullName"
            value={formData.studentFullName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="studentId">Student ID</Label>
          <Input
            id="studentId"
            name="studentId"
            type="number"
            value={formData.studentId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="diplomaTitle">Diploma Title</Label>
          <Input
            id="diplomaTitle"
            name="diplomaTitle"
            value={formData.diplomaTitle}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="academicGrade">Academic Grade</Label>
          <Input
            id="academicGrade"
            name="academicGrade"
            value={formData.academicGrade}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="metadataUri">Metadata URI</Label>
          <Input
            id="metadataUri"
            name="metadataUri"
            value={formData.metadataUri}
            onChange={handleChange}
            required
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4 justify-start items-start">
        <Button onClick={(e) => handleSubmit(e)} disabled={isPending}>
          {isPending
            ? "Approving request..."
            : isLoading
              ? "Miniting..."
              : "Mint certificate"}
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
              Certificate minted for {formData.recipient}
            </AlertDescription>
          </Alert>
        )}
      </CardFooter>
    </Card>
  );
}
