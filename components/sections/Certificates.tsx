import { getPublishedCertificates } from "@/lib/certificates-store";
import { CertificatesGrid } from "@/components/sections/CertificatesGrid";

export async function Certificates() {
  const certificates = await getPublishedCertificates();
  return <CertificatesGrid certificates={certificates} />;
}
