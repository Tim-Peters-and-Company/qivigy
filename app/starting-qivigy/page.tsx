import PageLayout from "@/components/page-layout";
import { StartingQivigyDosingProductInformationData, StartingQivigyDosingCalculator, StartingQivigyOrderingQivigy, StartingQivigyCustomerService } from "@/content/starting-qivigy";

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
        <div className="page-width starting-qivigy">
          <StartingQivigyOrderingQivigy />
          <div className="bg-linear-to-b from-deep-orange-light to-white absolute top-0 left-0 h-[300px] w-full -z-10"></div>
        </div>
      </div>

      <div className="arched-top relative pt-14">
        <div className="page-width starting-qivigy">
          <StartingQivigyCustomerService />
          <div className="bg-linear-to-b from-deep-orange-light to-white absolute top-0 left-0 h-[300px] w-full -z-10"></div>
        </div>
      </div>
    </PageLayout>
  );
}