import PageLayout from "@/components/page-layout";
import { StartingQivigyDosingProductInformationData, StartingQivigyDosingCalculator, StartingQivigyOrderingQivigy, StartingQivigyCustomerService } from "@/content/starting-qivigy";
import { SignupForm } from "@/components/forms/form-signup";

export default function Page() {
  return (
    <PageLayout pageTitle="Starting QIVIGY">
      <div className="page-width starting-qivigy pb-14">
        <StartingQivigyDosingProductInformationData />
      </div>

      <div className="arched-top relative pt-14 min-h-[500px]">
        <div className="page-width starting-qivigy">
          <StartingQivigyDosingCalculator />
          <div className="bg-linear-to-b from-deep-orange-light to-white absolute top-0 left-0 h-[300px] w-full -z-10"></div>
        </div>
      </div>

      <div className="arched-top relative pt-14">
        <div className="page-width starting-qivigy pb-14">
          <StartingQivigyOrderingQivigy />
          <div className="bg-linear-to-b from-deep-orange-light to-white absolute top-0 left-0 h-[300px] w-full -z-10"></div>
        </div>
      </div>

      <div className="arched-top relative pt-14">
        <div className="page-width starting-qivigy">
          <StartingQivigyCustomerService />
          <SignupForm />
          <p className="text-xs mt-8"><strong>Reference: 1.</strong> QIVIGY [prescribing information]. Kedrion Biopharma Inc.; 2025. </p>
          <div className="bg-linear-to-b from-deep-orange-light to-white absolute top-0 left-0 h-[300px] w-full -z-10"></div>
        </div>
      </div>
    </PageLayout>
  );
}