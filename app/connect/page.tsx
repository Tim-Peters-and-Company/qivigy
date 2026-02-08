import PageLayout from "@/components/page-layout";
import { ConnectWithARep } from "@/content/connect-with-a-rep";

export default function Page() {
  return (
    <PageLayout pageTitle="Connect with a Rep">
      <div className="page-width">
        <ConnectWithARep />
      </div>
    </PageLayout>
  );
}