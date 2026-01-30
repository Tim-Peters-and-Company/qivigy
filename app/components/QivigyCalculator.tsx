"use client";

import { useState } from "react";
import {
  weightToKg,
  calculateFirstInfusion,
  formatInfusionTime,
  type WeightUnit,
  type FirstInfusionResult,
} from "@/lib/qivigy-calc";

const DOSE_MIN = 300;
const DOSE_MAX = 800;
const DOSE_ERROR =
  "The dose is not within the FDA-approved range of 300 to 800 mg/kg. Please enter a dose within that range.";

export default function QivigyCalculator() {
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState<WeightUnit>("kg");
  const [dose, setDose] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<FirstInfusionResult | null>(null);

  function handleCalculate() {
    setError(null);
    const weightNum = parseFloat(weight);
    const doseNum = parseFloat(dose);

    if (Number.isNaN(weightNum) || weightNum <= 0) {
      setError("Please enter a valid weight greater than 0.");
      return;
    }
    if (Number.isNaN(doseNum)) {
      setError("Please enter a valid dose.");
      return;
    }
    if (doseNum < DOSE_MIN || doseNum > DOSE_MAX) {
      setError(DOSE_ERROR);
      return;
    }

    const weightKg = weightToKg(weightNum, weightUnit);
    const calcResult = calculateFirstInfusion({
      weightKg,
      doseMgPerKg: doseNum,
    });
    setResult(calcResult);
  }

  function handleRecalculate() {
    setResult(null);
    setError(null);
  }

  function handlePrint() {
    window.print();
  }

  if (result) {
    const weightKg = weightToKg(parseFloat(weight), weightUnit);
    // Exclude 120+ row when infusion finishes before 120 min (grams would be negative)
    const displayRows = result.scheduleRows.filter(
      (r) => r.gramsPerInterval >= 0
    );
    return (
      <div className="min-h-screen p-6 print:p-0">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-6 text-2xl font-bold">
            QIVIGY Infusion Time Calculator
          </h1>

          <div className="mb-2 flex gap-4 border-b border-gray-300">
            <button
              type="button"
              className="border-b-2 border-blue-600 pb-2 font-semibold"
            >
              FIRST INFUSION
            </button>
            <button
              type="button"
              className="pb-2 text-gray-500"
              disabled
            >
              SUBSEQUENT INFUSIONS
            </button>
          </div>

          <div className="mb-8 grid grid-cols-2 gap-6 md:grid-cols-4">
            <div>
              <div className="text-2xl font-semibold">
                {parseFloat(weight)} {weightUnit}
              </div>
              <div className="text-sm text-gray-600">Patient weight</div>
            </div>
            <div>
              <div className="text-2xl font-semibold">{dose} mg/kg</div>
              <div className="text-sm text-gray-600">Dose</div>
            </div>
            <div>
              <div className="text-2xl font-semibold">{result.totalDoseG.toFixed(1)} g</div>
              <div className="text-sm text-gray-600">Total dose</div>
            </div>
            <div>
              <div className="text-2xl font-semibold">
                {formatInfusionTime(result.infusionTimeMinutes)}
              </div>
              <div className="text-sm text-gray-600">
                Estimated total infusion time
              </div>
            </div>
          </div>

          <div className="print-results">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                Infusion Rate Schedule for First Infusion
              </h2>
              <div className="flex gap-4 no-print">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="text-sm underline"
                >
                  Print results
                </button>
                <button
                  type="button"
                  onClick={handleRecalculate}
                  className="text-sm underline"
                >
                  Recalculate
                </button>
              </div>
            </div>

            <table className="w-full border-collapse border border-gray-300 text-left">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2"></th>
                  {displayRows.map((row) => (
                    <th key={row.interval} className="border border-gray-300 p-2">
                      {row.interval}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2 font-medium">Infusion rate (mL/kg/min)</td>
                  {displayRows.map((row) => (
                    <td key={row.interval} className="border border-gray-300 p-2">
                      {row.rateMlPerKgMin.toFixed(2)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 font-medium">Infusion rate (mg/kg/min)</td>
                  {displayRows.map((row) => (
                    <td key={row.interval} className="border border-gray-300 p-2">
                      {row.rateMgPerKgMin.toFixed(1)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 font-medium">Grams infused per 30 min.</td>
                  {displayRows.map((row) => (
                    <td key={row.interval} className="border border-gray-300 p-2">
                      {row.gramsPerInterval.toFixed(1)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 font-medium">Cumulative grams infused</td>
                  {displayRows.map((row) => (
                    <td key={row.interval} className="border border-gray-300 p-2">
                      {(row.interval === "90-119"
                        ? Math.min(row.cumulativeGrams, result.totalDoseG)
                        : row.cumulativeGrams
                      ).toFixed(1)}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>

            <p className="mt-4 text-sm text-gray-600">
              Table based on the infusion rate schedule used in the pivotal
              trial for QIVIGY.1
            </p>

            <section className="no-print mt-8 rounded border border-amber-200 bg-amber-50 p-4 font-mono text-sm">
              <h3 className="mb-3 font-semibold text-amber-900">
                Debug: calculation steps
              </h3>
              <dl className="grid gap-2 [&>dt]:font-medium [&>dt]:text-amber-900">
                <dt>Weight entered</dt>
                <dd className="ml-0 text-amber-800">
                  {weight} {weightUnit}
                  {weightUnit === "lbs" && (
                    <span className="text-amber-700">
                      {" "}
                      → {weightKg.toFixed(4)} kg (÷ 2.2)
                    </span>
                  )}
                </dd>
                <dt>Weight in kg (W)</dt>
                <dd className="ml-0 text-amber-800">
                  {weightKg.toFixed(4)} kg
                </dd>
                <dt>Dose (D)</dt>
                <dd className="ml-0 text-amber-800">{dose} mg/kg</dd>
                <dt>Total dose (TD)</dt>
                <dd className="ml-0 text-amber-800">
                  TD = W × D / 1000 = {weightKg.toFixed(4)} × {dose} / 1000 ={" "}
                  {result.totalDoseG.toFixed(4)} g
                </dd>
                <dt>Infusion time (IT)</dt>
                <dd className="ml-0 text-amber-800">
                  {result.infusionTimeMinutes} minutes (loop: T=0, CD=0; each minute add to CD by rate; when CD ≥ TD, IT = T)
                  <br />
                  {formatInfusionTime(result.infusionTimeMinutes)}
                  <br />
                  {result.infusionTimeMinutes >= 120 ? (
                    <>
                      Calculation: 30 + 30 + 30 + 30 + {result.infusionTimeMinutes - 120} = 120 + {result.infusionTimeMinutes - 120} = {result.infusionTimeMinutes} min
                      <br />
                      (0-29: 30 min; 30-59: 30 min; 60-89: 30 min; 90-119: 30 min; 120+: {result.infusionTimeMinutes - 120} min partial)
                    </>
                  ) : result.infusionTimeMinutes >= 90 ? (
                    <>Calculation: 30 + 30 + 30 + {result.infusionTimeMinutes - 90} = 90 + {result.infusionTimeMinutes - 90} = {result.infusionTimeMinutes} min (0-29: 30; 30-59: 30; 60-89: 30; 90-119: {result.infusionTimeMinutes - 90} min partial)</>
                  ) : result.infusionTimeMinutes >= 60 ? (
                    <>Calculation: 30 + 30 + {result.infusionTimeMinutes - 60} = 60 + {result.infusionTimeMinutes - 60} = {result.infusionTimeMinutes} min (0-29: 30; 30-59: 30; 60-89: {result.infusionTimeMinutes - 60} min partial)</>
                  ) : result.infusionTimeMinutes >= 30 ? (
                    <>Calculation: 30 + {result.infusionTimeMinutes - 30} = 30 + {result.infusionTimeMinutes - 30} = {result.infusionTimeMinutes} min (0-29: 30; 30-59: {result.infusionTimeMinutes - 30} min partial)</>
                  ) : (
                    <>Calculation: {result.infusionTimeMinutes} min (0-29: {result.infusionTimeMinutes} min partial)</>
                  )}
                </dd>
                <dt>Rates by interval</dt>
                <dd className="ml-0">
                  <table className="mt-1 w-full border-collapse border border-amber-200 text-left text-amber-800">
                    <thead>
                      <tr className="bg-amber-100">
                        <th className="border border-amber-200 p-2">Interval (min)</th>
                        <th className="border border-amber-200 p-2">Rate (mg/kg/min)</th>
                        <th className="border border-amber-200 p-2">Grams per 30 min</th>
                        <th className="border border-amber-200 p-2">Math</th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayRows.map((r) => (
                        <tr key={r.interval}>
                          <td className="border border-amber-200 p-2">{r.interval}</td>
                          <td className="border border-amber-200 p-2">{r.rateMgPerKgMin.toFixed(1)}</td>
                          <td className="border border-amber-200 p-2">
                            {r.interval === "120+" ? `${r.gramsPerInterval.toFixed(2)} g (partial)` : `${r.gramsPerInterval.toFixed(2)} g`}
                          </td>
                          <td className="border border-amber-200 p-2 text-xs">
                            {r.interval === "120+" ? (
                              <>TD − cumulative(0–119) = {result.totalDoseG.toFixed(2)} − {displayRows[3].cumulativeGrams.toFixed(2)} = {r.gramsPerInterval.toFixed(2)} g</>
                            ) : (
                              <>{r.rateMgPerKgMin} × 30 × W / 1000 = {r.rateMgPerKgMin} × 30 × {weightKg.toFixed(2)} / 1000 = {r.gramsPerInterval.toFixed(2)} g</>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </dd>
                <dt>Schedule table (grams per interval)</dt>
                <dd className="ml-0">
                  <table className="mt-1 w-full border-collapse border border-amber-200 text-left text-amber-800">
                    <thead>
                      <tr className="bg-amber-100">
                        <th className="border border-amber-200 p-2">Interval (min)</th>
                        <th className="border border-amber-200 p-2">Grams per interval</th>
                        <th className="border border-amber-200 p-2">Cumulative grams</th>
                        <th className="border border-amber-200 p-2">Math</th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayRows.map((r, i) => {
                        const prevCumulative = i === 0 ? 0 : displayRows[i - 1].cumulativeGrams;
                        return (
                          <tr key={r.interval}>
                            <td className="border border-amber-200 p-2">{r.interval}</td>
                            <td className="border border-amber-200 p-2">{r.gramsPerInterval.toFixed(2)} g</td>
                            <td className="border border-amber-200 p-2">
                              {(r.interval === "90-119"
                                ? Math.min(r.cumulativeGrams, result.totalDoseG)
                                : r.cumulativeGrams
                              ).toFixed(2)} g
                            </td>
                            <td className="border border-amber-200 p-2 text-xs">
                              {i === 0 ? (
                                <>{r.rateMgPerKgMin} × 30 × W / 1000 = {r.gramsPerInterval.toFixed(2)} g</>
                              ) : r.interval === "120+" ? (
                                <>cumulative(0–119) + partial = {prevCumulative.toFixed(2)} + {r.gramsPerInterval.toFixed(2)} = {r.cumulativeGrams.toFixed(2)} g = TD</>
                              ) : (
                                <>cumulative(prev) + this = {prevCumulative.toFixed(2)} + {r.gramsPerInterval.toFixed(2)} = {r.cumulativeGrams.toFixed(2)} g</>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </dd>
              </dl>
            </section>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-2xl font-bold">
          QIVIGY Infusion Time Calculator
        </h1>

        <div className="mb-2 flex gap-4 border-b border-gray-300">
          <button
            type="button"
            className="border-b-2 border-blue-600 pb-2 font-semibold"
          >
            FIRST INFUSION
          </button>
          <button
            type="button"
            className="pb-2 text-gray-500"
            disabled
          >
            SUBSEQUENT INFUSIONS
          </button>
        </div>

        <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
          <p className="mb-6 text-sm">
            The dose of QIVIGY for the treatment of PI is 300-800 mg/kg every
            3-4 weeks
          </p>

          {error && (
            <div
              className="mb-4 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-800"
              role="alert"
            >
              {error}
            </div>
          )}

          <div className="mb-4 flex flex-wrap gap-6">
            <div className="flex-1 min-w-[140px]">
              <label htmlFor="weight" className="mb-1 block font-semibold">
                WEIGHT
              </label>
              <input
                id="weight"
                type="number"
                min="0"
                step="any"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full rounded border border-gray-300 px-3 py-2"
              />
              <div className="mt-1">
                <span className="text-sm">UNITS: </span>
                <select
                  value={weightUnit}
                  onChange={(e) => setWeightUnit(e.target.value as WeightUnit)}
                  className="rounded border border-gray-300 px-2 py-1 text-sm"
                  aria-label="Weight units"
                >
                  <option value="kg">kg</option>
                  <option value="lbs">lbs</option>
                </select>
              </div>
            </div>
            <div className="flex-1 min-w-[140px]">
              <label htmlFor="dose" className="mb-1 block font-semibold">
                DESIRED DOSE
              </label>
              <input
                id="dose"
                type="number"
                min="0"
                step="any"
                value={dose}
                onChange={(e) => setDose(e.target.value)}
                className="w-full rounded border border-gray-300 px-3 py-2"
              />
              <div className="mt-1 text-sm">mg/kg</div>
            </div>
            <div className="flex items-end">
              <button
                type="button"
                onClick={handleCalculate}
                className="rounded bg-orange-400 px-6 py-2 font-semibold text-white hover:bg-orange-500"
              >
                CALCULATE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
