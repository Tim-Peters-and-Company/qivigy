import Calculator from "@/components/calculator/calculator-calculator";
import { CalculatorInfusionRatesData } from "@/components/calculator/calculator-infusion-rates";

export const CalculatorTabs = [
  {
    label: 'Infusion Rate Protocol',
    content: <>
      <CalculatorInfusionRatesData />
    </>
  },
  {
    label: 'Infusion Time Calculator',
    content: <>
      <h2 className="mb-2 mt-8 text-2xl font-bold">
        QIVIGY Infusion Time Calculator
      </h2>
      <p className="mb-6 text-sm text-gray-600">Select the type of infusion you want to calculate:</p>
      <Calculator />

    </>
  }
]