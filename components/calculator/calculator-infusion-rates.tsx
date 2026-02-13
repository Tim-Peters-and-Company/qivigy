"use client"

import { Button } from "@/components/ui/button"
import { useCalculatorTabs } from "@/components/calculator/calculator-tabs-context"

export const CalculatorInfusionRatesData = () => {
  const { setSelectedIndex } = useCalculatorTabs()

  const handleClick = () => {
    // Index 1 corresponds to the "Infusion Time Calculator" tab
    setSelectedIndex(1)
  }

  return (
    <div className="calculator-infusions">
      <ul className="list-disc list-outside pl-8">
        <li>In the pivotal trial, QIVIGY was studied using a 30-minute infusion rate escalation protocol for the first infusion and a 15-minute infusion rate escalation protocol for subsequent infusions.<sup>1</sup>
        </li>
        <li>Infusion rates should be increased only if the infusion is well tolerated.<sup>1</sup></li>
      </ul>

      <h2>Infusion Considerations<sup>1</sup></h2>
      <ul className="list-disc list-outside pl-8">
        <li>Hydrate the patient adequately prior to the initiation of infusion.</li>
        <li>Monitor patient vital signs throughout the infusion.</li>
        <li>The rate of infusion can be related to certain severe adverse drug reactions. Slow or stop infusion if adverse reactions occur.</li>
        <li>If symptoms subside promptly, resume infusion at a lower rate as tolerated by the patient.</li>
        <li>The observation time of patients after QIVIGY administration may vary. If the patient (a) has not received QIVIGY or another IgG product, (b) is switched from an alternative IGIV product or (c) has had a long interval since the previous infusion, prolong the observation time for adverse reactions after QIVIGY infusion.</li>
        <li>Ensure that patients with pre-existing renal insufficiency are not volume depleted. For patients at risk of renal dysfunction or thrombosis, administer QIVIGY at the minimum dose and infusion rate practicable and discontinue QIVIGY if renal function deteriorates.</li>
      </ul>

      <p className="text-center md:text-left"><Button onClick={handleClick} className="whitespace-normal! leading-none!">Calculate Infusion Rates for a Patient</Button></p>
    </div>
  )
}
