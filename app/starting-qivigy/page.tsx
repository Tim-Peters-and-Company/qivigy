import PageLayout from "@/components/page-layout";
import { StartingQivigyDosingProductInformationData, StartingQivigyDosingCalculator, StartingQivigyOrderingQivigy, StartingQivigyCustomerService } from "@/content/starting-qivigy";
import { SignupForm } from "@/components/forms/form-signup";
import CalculatorSection from "@/components/calculator/calculator-section";

export default function Page() {
  return (
    <PageLayout pageTitle={<>Starting QIVIGY<sup className="font-normal! text-2xl -top-4.5!">®</sup></>}>
      <div className="page-width starting-qivigy pb-14">
        <StartingQivigyDosingProductInformationData />
      </div>

      <div className="arched-top relative pt-14 min-h-[500px]">
        <div className="page-width">
          <div className="starting-qivigy mb-8">
            <StartingQivigyDosingCalculator />
          </div>
          <CalculatorSection />
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
          <p className="reference-text mt-8!"><strong>References: 1.</strong> QIVIGY [prescribing information]. Kedrion Biopharma Inc.; 2025.</p>
          <div className="bg-linear-to-b from-deep-orange-light to-white absolute top-0 left-0 h-[300px] w-full -z-10"></div>
        </div>
      </div>
    </PageLayout>
  );
}