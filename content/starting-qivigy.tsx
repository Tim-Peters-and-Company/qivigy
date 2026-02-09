import Image from "next/image";
import { INFUSION_PROVIDERS, type InfusionProvider } from "@/content/infusion-providers";
import { ProviderSection } from "@/components/Providers";
import Characteristics1 from "@/assets/images/characteristics-1.png";
import Characteristics2 from "@/assets/images/characteristics-2.png";
import Characteristics3 from "@/assets/images/characteristics-3.png";
import Characteristics4 from "@/assets/images/characteristics-4.png";

export const StartingQivigyDosingProductInformationData = () => {
  return (
    <>
      <h2 id="dosing-product-information">Dosing and product information</h2>
      <h3>Recommended dosage<sup>1</sup></h3>

      <dl>
        <dt>
          <strong>DOSE</strong>
          300-800 mg/kg (3-8 mL/kg) every 3-4 weeks
        </dt>
        <dd>
          <strong>FIRST INFUSION</strong>
          1 mg/kg/min (0.01 mL/kg/min) for 30 minutes; increase every 30 minutes to a maximum of 8 mg/kg/min (0.08 mL/kg/min)
        </dd>
        <dt>
          <strong>MAXIMUM INFUSION RATE</strong>
          8 mg/kg/min (4.8 mL/kg/h)
        </dt>
        <dd>
          <strong>SUBSEQUENT INFUSIONS</strong>
          2 mg/kg/min (0.02 mL/kg/min) for 15 minutes; increase every 15 minutes to a maximum of 8 mg/kg/min (0.08 mL/kg/min)
        </dd>
      </dl>

      <h3 className="mt-16!">Quality characteristics</h3>
      <h4>QIVIGY IS:</h4>
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
            <strong>Supplied in 5- and 10-gram single-dose vials</strong><sup>1</sup>
          </span>
        </li>
        <li>
          <Image src={Characteristics2} alt="Characteristics 2" width={80} height={80} />
          <span>
            <strong>A high-purity (≥96 IgG)</strong> IVIG that <strong>contains only trace amounts of IgA (≤50 mg/L)</strong><sup>1</sup>
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
      <table>
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

      </table >

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
        <ProviderSection title="Distributors" providers={INFUSION_PROVIDERS.distributors} />
        <ProviderSection title="Specialty pharmacies" providers={INFUSION_PROVIDERS.specialtyPharmacies} />
      </div>
    </>
  );
};

export const StartingQivigyCustomerService = () => {
  return (
    <>
      <h2 id="customer-service">Customer service</h2>
    </>
  );
};