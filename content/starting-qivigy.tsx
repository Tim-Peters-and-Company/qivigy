import Image from "next/image";
import { INFUSION_PROVIDERS } from "@/content/infusion-providers";
import { ProviderSection } from "@/components/Providers";
import Characteristics1 from "@/assets/images/characteristics-1.png";
import Characteristics2 from "@/assets/images/characteristics-2.png";
import Characteristics3 from "@/assets/images/characteristics-3.png";
import Characteristics4 from "@/assets/images/characteristics-4.png";
import CustomerService1 from "@/assets/images/custserv-1.png";
import CustomerService2 from "@/assets/images/custserv-2.png";

export const StartingQivigyDosingProductInformationData = () => {
  return (
    <>
      <h2 id="dosing-product-information">Dosing and product information</h2>
      <h3 className="mb-0!">Recommended dosage<sup>1</sup></h3>
      <p><em>For intravenous use only.</em></p>

      <dl>
        <dt>
          <strong>DOSE</strong>
          300-800 mg/kg <span className="whitespace-nowrap">(3-8 mL/kg)</span> every 3-4 weeks
        </dt>
        <dd>
          <strong>FIRST INFUSION</strong>
          1 mg/kg/min (0.01 mL/kg/min) for 30 minutes; increase every 30 minutes to a maximum of 8 mg/kg/min (0.08 mL/kg/min) as tolerated
        </dd>
        <dt>
          <strong>MAXIMUM INFUSION RATE</strong>
          8 mg/kg/min <span className="whitespace-nowrap">(4.8 mL/kg/h)</span>
        </dt>
        <dd>
          <strong>SUBSEQUENT INFUSIONS</strong>
          2 mg/kg/min (0.02 mL/kg/min) for 15 minutes; increase every 15 minutes to a maximum of 8 mg/kg/min (0.08 mL/kg/min) as tolerated
        </dd>
      </dl>

      <h3 className="mt-16!">Quality characteristics</h3>
      <h4 className="font-bold">QIVIGY IS:</h4>
      <ul className="starting-qivigy__characteristics">
        <li>
          <Image className="mr-2" src={Characteristics1} alt="Characteristics 1" width={80} height={80} />
          <span>
            <strong>Glycine-stabilized</strong> and <strong>does not contain any sugars or preservatives</strong><sup>1</sup>
          </span>
        </li>
        <li>
          <Image src={Characteristics3} alt="Characteristics 3" width={80} height={80} />
          <span>
            <strong>Supplied in 5- and <span className="whitespace-nowrap">10-gram</span> single-dose vials</strong><sup>1</sup>
          </span>
        </li>
        <li>
          <Image src={Characteristics2} alt="Characteristics 2" width={80} height={80} />
          <span>
            A <strong>high-purity (≥96% IgG) IVIG</strong> that <strong>contains only trace amounts of IgA (≤50 mg/L)</strong><sup>1</sup>
          </span>
        </li>
        <li>
          <Image src={Characteristics4} alt="Characteristics 4" width={80} height={80} />
          <span>
            Manufactured with <strong>4 steps of viral removal/inactivation</strong><sup>1</sup>
          </span>
        </li>
      </ul>

      <h3 className="mt-16!">National Drug Codes (NDC) for QIVIGY<sup>1</sup></h3>
      <div className="starting-qivigy__ndc-table-wrapper">
        <table className="starting-qivigy__ndc-table">
          <thead>
            <tr>
              <th>Presentations</th>
              <th>NDC Number of Carton</th>
              <th>NDC Number of Label</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>50 mL vial containing 5 grams of protein</td>
              <td>76179-010-01</td>
              <td>76179-010-02</td>
            </tr>
            <tr>
              <td>100 mL vial containing 10 grams of protein</td>
              <td>76179-010-03</td>
              <td>76179-010-04</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export const StartingQivigyDosingCalculator = () => {
  return (
    <>
      <h2 id="dosing-calculator">Dosing calculator</h2>
    </>
  );
};

export const StartingQivigyOrderingQivigy = () => {
  return (
    <>
      <h2 id="ordering-qivigy">Ordering QIVIGY</h2>
      <h3>QIVIGY is available through a limited network of distributors and specialty pharmacies</h3>
      <div className="infusion-providers">
        <ProviderSection title="DISTRIBUTOR" providers={INFUSION_PROVIDERS.distributors} />
        <h4 className="infusion-providers__section-title">GROUP PURCHASING ORGANIZATIONS (GPOs)</h4>
        <ProviderSection title="ACUTE GPO" providers={INFUSION_PROVIDERS.acuteGpos} headingLevel="h5" />
        <ProviderSection title="NON-ACUTE GPO" providers={INFUSION_PROVIDERS.nonAcuteGpos} headingLevel="h5" />
        <ProviderSection title="SPECIALTY PHARMACIES" providers={INFUSION_PROVIDERS.specialtyPharmacies} />
      </div>
    </>
  );
};

export const StartingQivigyCustomerService = () => {
  return (
    <>
      <h2 id="customer-service">Customer service</h2>
      <p>The Kedrion customer service team is here to help</p>

      <ul className="starting-qivigy__customer-service">
        <li>
          <Image className="mr-2" src={CustomerService1} alt="" width={80} height={80} />
          <span>
            <h2>GENERAL INFORMATION</h2>
            <p>For more information, call <strong><a href="tel:1-866-398-0825" className="whitespace-nowrap">1-866-398-0825</a></strong> or email <strong><a href="mailto:US_CustomerService@kedrion.com" className="whitespace-nowrap">US_CustomerService@kedrion.com</a></strong> </p>
          </span>
        </li>
        <li>
          <Image className="mr-2" src={CustomerService2} alt="" width={80} height={80} />
          <span>
            <h2>MEDICAL INFORMATION</h2>
            <p>For Medical Information requests, including AMCP Dossier requests, please call <strong><a href="tel:1-866-398-0825" className="whitespace-nowrap">1-866-398-0825</a></strong>, or email <strong><a href="mailto:US_MedicalInfo@kedrion.com" className="whitespace-nowrap">US_MedicalInfo@kedrion.com</a></strong>.</p>
          </span>
        </li>

      </ul>

      <h3 className="mt-16! text-navy!">Sign up to receive more information about QIVIGY </h3>

    </>
  );
};