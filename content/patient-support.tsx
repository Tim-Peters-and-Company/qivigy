import Image from "next/image";
import PhoneIcon from "@/assets/images/phone.png";
import EmailIcon from "@/assets/images/email.png";
import { Button } from "@/components/ui/button";
import { RightAngleIcon } from "@/components/icons/rightAngle";

const CheckmarkIcon = () => (
  <svg className="size-10 flex-shrink-0" width="43" height="39" viewBox="0 0 43 39" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_2591_2340)">
      <path d="M5.75273 0H34.1598C35.7411 0 37.1816 0.632053 38.2233 1.64802C39.2649 2.66399 39.9125 4.07323 39.9125 5.61825V33.3818C39.9125 34.9315 39.2649 36.336 38.2233 37.352C37.1816 38.3679 35.7457 39 34.1598 39H5.75273C4.17143 39 2.7309 38.3679 1.68922 37.352C0.647534 36.336 0 34.9315 0 33.3818V5.61825C0 4.07323 0.647534 2.66399 1.68922 1.64802C2.7309 0.632053 4.16674 0 5.75273 0ZM34.1551 3.83914H5.75273C5.25535 3.83914 4.8002 4.04046 4.46705 4.36351C4.13859 4.68655 3.93213 5.13133 3.93213 5.61825V33.3818C3.93213 33.8687 4.13859 34.3134 4.46705 34.6365C4.8002 34.9549 5.25535 35.1562 5.75273 35.1562H34.1598C34.6571 35.1562 35.1123 34.9549 35.4454 34.6365C35.7739 34.3088 35.9804 33.8687 35.9804 33.3818V5.61825C35.9804 5.13133 35.7739 4.68655 35.4454 4.36351C35.1123 4.04046 34.6571 3.83914 34.1598 3.83914" fill="#37516D" />
      <path d="M6.73383 19.013C5.64992 17.9503 5.64992 16.232 6.73383 15.1692C7.82244 14.1111 9.57735 14.1111 10.666 15.1692L20.2664 24.5517L38.2518 6.97595C39.3404 5.91785 41.0954 5.91785 42.184 6.97595C43.2726 8.03874 43.2726 9.75698 42.184 10.8198L22.2324 30.3198C21.1485 31.3826 19.3889 31.3826 18.3003 30.3198L6.73383 19.0177V19.013Z" fill="#CC4900" />
    </g>
    <defs>
      <clipPath id="clip0_2591_2340">
        <rect width="43" height="39" fill="white" />
      </clipPath>
    </defs>
  </svg>

);

export const PatientSupportCopayProgram = () => (
  <div className="patient-support-copay">
    <h2>QIVIGY® copay program</h2>
    <h3>Copay assistance is available for QIVIGY patients covered under both pharmacy and medical benefits.</h3>

    <div className="patient-support-copay__callout">
      <p className="patient-support-copay__callout__block">Eligible patients can receive up to <strong>$10,000 per calendar year</strong> to use on out-of-pocket costs for QIVIGY.</p>
      <p className="patient-support-copay__callout__description">The program covers the <strong>copay, deductible, and/or co-insurance</strong> associated with the cost of QIVIGY only. The program does not cover costs associated with administration or supplies.</p>
    </div>

    <h4>Copay benefit:</h4>
    <ul>
      <li>$10,000 per patient per year</li>
      <li>Electronic processing; no patient cards necessary</li>
    </ul>

    <h4>Program and patient eligibility guidelines:</h4>
    <ul>
      <li>Patients must be commercially insured</li>
      <li>Patients must express a financial need</li>
      <li>Patients’ health plan permits members to participate in copay assistance programs</li>
    </ul>

    <h4>Program RESTRICTIONS:</h4>
    <ul>
      <li>Not valid for prescriptions eligible for reimbursement by any federal or state healthcare programs, such as Medicare, Medicaid, Medigap, Veterans Affairs, Department of Defense, TRICARE, or any other federal or state-funded programs</li>
    </ul>
  </div>
);

export const PatientSupportCopayReimbursement = () => (
  <div className="patient-support-copay-reimbursement">
    <h2>Copay and reimbursement support</h2>
    <h3 className="text-deep-orange">QIVIGY offers comprehensive reimbursement support</h3>
    <p>THIS SUPPORT INCLUDES: </p>
    <ul className="patient-support-copay-reimbursement__support">
      <li><CheckmarkIcon /> Patient-specific benefit verification claims</li>
      <li><CheckmarkIcon /> Payer coverage and coding research</li>
      <li><CheckmarkIcon /> Assistance with claims questions</li>
      <li><CheckmarkIcon /> Appeal support for denied prior authorizations</li>
    </ul>
    <p className="mt-15!">TO CONNECT WITH A REIMBURSEMENT SPECIALIST:</p>
    <ul className="patient-support-copay-reimbursement__connect">
      <li>
        <Image src={PhoneIcon} alt="Phone" width={74} height={74} />
        <a href="tel:1-888-262-8040">
          1-888-262-8040</a>
      </li>
      <li>
        <Image src={EmailIcon} alt="Email" width={74} height={74} />
        <a href="mailto:reimbursementsupport@medmonk.com">reimbursementsupport@medmonk.com</a>
      </li>
    </ul>
    <p className="mt-15! mb-20! text-center">
      <Button href="https://qivigy.medmonk.com/" variant="large">Visit <strong>QIVIGY.medmonk.com</strong> for full Terms and Conditions <RightAngleIcon className="size-5" /></Button>
    </p>
  </div >
);