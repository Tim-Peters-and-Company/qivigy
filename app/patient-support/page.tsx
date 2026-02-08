import PageLayout from "@/components/page-layout";
import { PatientSupportCopayProgram, PatientSupportCopayReimbursement } from "@/content/patient-support";

export default function PatientSupport() {

  return (
    <PageLayout pageTitle="Patient Support">
      <div className="page-width">
        <PatientSupportCopayProgram />
      </div>

      <div className="arched-top relative pt-8">
        <div className="page-width">
          <PatientSupportCopayReimbursement />
          <div className="bg-linear-to-b from-deep-orange-light to-white absolute top-0 left-0 h-[300px] w-full -z-10"></div>
        </div>
      </div>
    </PageLayout>
  );
}