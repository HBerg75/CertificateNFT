import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Calendar, GraduationCap } from "lucide-react";
import Image from "next/image";

interface Certificate {
  studentFullName: string;
  studentId: bigint;
  diplomaTitle: string;
  graduationYear: bigint;
  academicGrade: string;
  isActive: boolean;
  issuedAt: bigint;
}

interface CertificateCardsProps {
  certificates: Certificate[];
}

export default function CertificateCards({
  certificates,
}: CertificateCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {certificates.map((cert) => (
        <Card key={cert.studentId} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="font-semibold">{cert.studentFullName}</div>
            <CardDescription className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              Year: {cert.graduationYear}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video relative mb-4">
              <Image
                src={
                  cert.imageUrl ||
                  "https://images.itnewsinfo.com/commun/publi_info/originale/000000071477.png"
                }
                alt={`Certificate ${cert.graduationYear}`}
                className="object-cover rounded-md"
                height={200}
                width={250}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <GraduationCap className="mr-2 h-4 w-4" />
                <span className="text-sm font-medium">{cert.diplomaTitle}</span>
              </div>
              <Badge variant="secondary" className="text-sm">
                {cert.academicGrade}
              </Badge>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/50 pt-2">
            <p className="text-xs text-muted-foreground">
              Student ID: {cert.studentId}
            </p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
