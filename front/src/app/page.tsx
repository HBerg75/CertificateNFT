import CertificateCards from "@/components/certificates-cards";
import { getCertsPage, getTotalCerts } from "@/lib/certificates.action";

export default async function Home() {
  const totalCerts = await getTotalCerts();
  const certs = await getCertsPage(0, totalCerts);
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Student Certificates</h1>
        <CertificateCards certificates={certs} />
      </div>
    </div>
  );
}
