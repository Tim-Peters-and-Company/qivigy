import { INFUSION_PROVIDERS, type InfusionProvider } from "@/content/infusion-providers";
import { ProviderSection } from "@/components/Providers";

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

      <h3>Quality characteristics</h3>
      <h4>QIVIGY IS:</h4>
      <ul>
        <li>
          Glycine-stabilized and does not contain any sugars or preservatives<sup>1</sup>
        </li>
        <li>
          A high-purity (≥96 IgG) IVIG that contains only trace amounts of IgA (≤50 mg/L)<sup>1</sup>
        </li>
        <li>Supplied in 5- and 10-gram single-dose vials<sup>1</sup></li>
        <li>
          Manufactured with 4 steps of viral removal/inactivation<sup>1</sup>
        </li>
      </ul>

      <h3>National Drug Codes (NDC) for QIVIGY1</h3>
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