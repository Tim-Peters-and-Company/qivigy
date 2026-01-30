/**
 * QIVIGY First Infusion calculation and schedule table.
 * Concentration 100 mg/mL for mL/kg/min column.
 */

const CONCENTRATION_MG_PER_ML = 100;

const RATES_MG_KG_MIN = [1.0, 2.0, 4.0, 6.0, 8.0] as const;
const INTERVAL_LABELS = ["0-29", "30-59", "60-89", "90-119", "120+"] as const;

export type WeightUnit = "kg" | "lbs";

export interface FirstInfusionInput {
  weightKg: number;
  doseMgPerKg: number;
}

export interface ScheduleRow {
  interval: string;
  rateMgPerKgMin: number;
  rateMlPerKgMin: number;
  gramsPerInterval: number;
  cumulativeGrams: number;
}

export interface FirstInfusionResult {
  totalDoseG: number;
  infusionTimeMinutes: number;
  scheduleRows: ScheduleRow[];
}

/**
 * Convert weight to kg if in lbs.
 */
export function weightToKg(weight: number, unit: WeightUnit): number {
  return unit === "lbs" ? weight / 2.2 : weight;
}

/**
 * Compute total dose (g): TD = W * D / 1000.
 */
export function totalDoseG(weightKg: number, doseMgPerKg: number): number {
  return (weightKg * doseMgPerKg) / 1000;
}

/**
 * First infusion: iterate by minute until cumulative dose >= total dose.
 * Returns infusion time in minutes.
 */
export function firstInfusionTimeMinutes(
  weightKg: number,
  totalDoseG: number
): number {
  let CD = 0;
  let T = 0;
  const W = weightKg;

  while (CD < totalDoseG) {
    T += 1;
    if (T < 30) {
      CD += (1.0 * W) / 1000;
    } else if (T < 60) {
      CD += (2.0 * W) / 1000;
    } else if (T < 90) {
      CD += (4.0 * W) / 1000;
    } else if (T < 120) {
      CD += (6.0 * W) / 1000;
    } else {
      CD += (8.0 * W) / 1000;
    }
  }

  return T;
}

/**
 * Format minutes as "X hours, Y minutes".
 */
export function formatInfusionTime(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours === 0) {
    return `${minutes} minute${minutes !== 1 ? "s" : ""}`;
  }
  if (minutes === 0) {
    return `${hours} hour${hours !== 1 ? "s" : ""}`;
  }
  return `${hours} hour${hours !== 1 ? "s" : ""}, ${minutes} minute${minutes !== 1 ? "s" : ""}`;
}

/**
 * Build infusion rate schedule table for first infusion.
 */
export function buildFirstInfusionSchedule(
  weightKg: number,
  totalDoseG: number,
  infusionTimeMinutes: number
): ScheduleRow[] {
  const W = weightKg;
  const rows: ScheduleRow[] = [];
  let cumulative = 0;

  // Full 30-minute intervals (0-29, 30-59, 60-89, 90-119)
  for (let i = 0; i < 4; i++) {
    const rate = RATES_MG_KG_MIN[i];
    const gramsPerInterval = (rate * 30 * W) / 1000;
    cumulative += gramsPerInterval;
    rows.push({
      interval: INTERVAL_LABELS[i],
      rateMgPerKgMin: rate,
      rateMlPerKgMin: rate / CONCENTRATION_MG_PER_ML,
      gramsPerInterval,
      cumulativeGrams: cumulative,
    });
  }

  // 120+ partial interval
  const grams120Plus = totalDoseG - cumulative;
  rows.push({
    interval: INTERVAL_LABELS[4],
    rateMgPerKgMin: RATES_MG_KG_MIN[4],
    rateMlPerKgMin: RATES_MG_KG_MIN[4] / CONCENTRATION_MG_PER_ML,
    gramsPerInterval: grams120Plus,
    cumulativeGrams: totalDoseG,
  });

  return rows;
}

/**
 * Run full first infusion calculation.
 */
export function calculateFirstInfusion(
  input: FirstInfusionInput
): FirstInfusionResult {
  const { weightKg, doseMgPerKg } = input;
  const totalDose = totalDoseG(weightKg, doseMgPerKg);
  const infusionTimeMinutes = firstInfusionTimeMinutes(weightKg, totalDose);
  const scheduleRows = buildFirstInfusionSchedule(
    weightKg,
    totalDose,
    infusionTimeMinutes
  );
  return {
    totalDoseG: totalDose,
    infusionTimeMinutes,
    scheduleRows,
  };
}
