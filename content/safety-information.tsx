import Link from "next/link";

export const SafetyInformationContent = () => (
  <div className="safety-information">
    <h2>INDICATIONS AND USAGE</h2>
    <p>QIVIGY<sup>®</sup> (immune globulin intravenous, human-kthm) is a 10% immune globulin (Ig) liquid indicated for the treatment of adults with primary humoral immunodeficiency.</p>
    <h2>Important safety information</h2>
    <div className="safety-information__warning">
      <h2>WARNING: THROMBOSIS, RENAL DYSFUNCTION, and ACUTE RENAL FAILURE</h2>
      <p><em>See full prescribing information for complete boxed warning.</em></p>
      <ul>
        <li>Thrombosis may occur with immune globulin products, including QIVIGY.</li>
        <li>Renal dysfunction, acute renal failure, osmotic nephrosis may occur with immune globulin intravenous (IGIV) products in predisposed patients. Such events require immediate medical intervention, if not recognized or managed appropriately, may result in persistent or significant disability or incapacity or lead to fatal outcome.</li>
        <li>For patients at risk of thrombosis, renal dysfunction or failure, administer QIVIGY at the minimum dose available and the minimum infusion rate practicable. Ensure adequate hydration in patients before administration. Monitor for signs and symptoms of thrombosis and assess blood viscosity in patients at risk for hyperviscosity.</li>
      </ul>
    </div>
    <h2>CONTRAINDICATIONS</h2>
    <p>QIVIGY is contraindicated in patients who have had an anaphylactic or severe systemic reaction to the administration of human immune globulin and in IgA deficient patients with antibodies against IgA and history of hypersensitivity.</p>
    <h2>WARNINGS AND PRECAUTIONS</h2>
    <p><strong>Severe hypersensitivity reactions</strong>, including anaphylaxis, may occur. In case of hypersensitivity, discontinue QIVIGY infusion and manage as appropriate.</p>
    <p><strong>Hyperproteinemia, hyperviscosity, and hyponatremia</strong> may occur in patients receiving IGIV treatment, including QIVIGY.</p>
    <p><strong>Aseptic meningitis syndrome</strong> may occur in patients receiving IGIV treatment, especially with high doses or rapid infusion.</p>
    <p><strong>Hemolysis</strong> can develop subsequent to IGIV treatment. Monitor patients for hemolysis.</p>
    <p><strong>Transfusion-related acute lung injury:</strong> Monitor patients for pulmonary adverse reactions.</p>
    <p><strong>Transmissible infectious agents:</strong> QIVIGY is made from human plasma and may carry a risk of transmitting infectious agents, eg, viruses, the variant Creutzfeldt-Jakob disease (vCJD) agent, and, theoretically, the Creutzfeldt-Jakob disease (CJD) agent.</p>
    <p><strong>Interference with laboratory tests:</strong> After infusion of Ig, transitory rise of passively transferred antibodies may yield positive serological results, with potential for misleading interpretation.</p>
    <h2>ADVERSE REACTIONS</h2>
    <p>The most common adverse reactions occurring in ≥5% of patients treated were headache, fatigue, infusion-related reaction, Coombs direct test positive, nausea, sinusitis, dizziness, and diarrhea.</p>
    <p className="text-deep-orange font-bold">To report SUSPECTED ADVERSE REACTIONS, contact Kedrion Biopharma Inc. at 1-855-3KDRION (1-855-353-7466) or FDA at 1-800-FDA-1088 or <a href="https://www.fda.gov/medwatch" target="_blank" rel="noopener noreferrer">www.fda.gov/medwatch</a>.</p>
    <p className="font-bold">Please see full <Link href="https://www.qivigy.com/download/QIVIGI-PI-US-K00.pdf">Prescribing Information</Link> for complete prescribing details, including Boxed Warning.</p>
  </div>
);

export const safetyInformationData = {
  title: "Important Safety Information",
  content: <SafetyInformationContent />,
};
