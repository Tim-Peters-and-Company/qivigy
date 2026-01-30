/**
 * QIVIGY First Infusion calculation and schedule table.
 * Concentration 100 mg/mL for mL/kg/min column.
 */

const CONCENTRATION_MG_PER_ML = 100;

const RATES_MG_KG_MIN = [1.0, 2.0, 4.0, 6.0, 8.0] as const;
const INTERVAL_LABELS = ["0-29", "30-59", "60-89", "90-119", "120+"] as const;

// Subsequent: 15-min intervals; rates 4, 8, 12, 8 mg/kg/min (per reference schedule: 25.2 g in 45 min, then 9.8 at 8)
const SUBSEQUENT_RATES_MG_KG_MIN = [4.0, 8.0, 12.0, 8.0] as const;
const SUBSEQUENT_INTERVAL_LABELS = ["0-14", "15-29", "30-44", "45+"] as const;

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

/**
 * Subsequent infusion: iterate by minute until cumulative dose >= total dose.
 * Rates: T < 15 → 4.0; 15 ≤ T < 30 → 8.0; 30 ≤ T < 45 → 12.0; T ≥ 45 → 8.0 mg/kg/min.
 * Returns infusion time in minutes.
 */
export function subsequentInfusionTimeMinutes(
  weightKg: number,
  totalDoseG: number
): number {
  let CD = 0;
  let T = 0;
  const W = weightKg;

  while (CD < totalDoseG) {
    T += 1;
    if (T < 15) {
      CD += (SUBSEQUENT_RATES_MG_KG_MIN[0] * W) / 1000;
    } else if (T < 30) {
      CD += (SUBSEQUENT_RATES_MG_KG_MIN[1] * W) / 1000;
    } else if (T < 45) {
      CD += (SUBSEQUENT_RATES_MG_KG_MIN[2] * W) / 1000;
    } else {
      CD += (SUBSEQUENT_RATES_MG_KG_MIN[3] * W) / 1000;
    }
  }

  return T;
}

/**
 * Build infusion rate schedule table for subsequent infusion.
 * Intervals 0-14, 15-29, 30-44 (15 min each), 45+ (partial).
 */
export function buildSubsequentInfusionSchedule(
  weightKg: number,
  totalDoseG: number,
  infusionTimeMinutes: number
): ScheduleRow[] {
  const W = weightKg;
  const rows: ScheduleRow[] = [];
  let cumulative = 0;

  for (let i = 0; i < 3; i++) {
    const rate = SUBSEQUENT_RATES_MG_KG_MIN[i];
    const gramsPerInterval = (rate * 15 * W) / 1000;
    cumulative += gramsPerInterval;
    rows.push({
      interval: SUBSEQUENT_INTERVAL_LABELS[i],
      rateMgPerKgMin: rate,
      rateMlPerKgMin: rate / CONCENTRATION_MG_PER_ML,
      gramsPerInterval,
      cumulativeGrams: cumulative,
    });
  }

  const grams45Plus = totalDoseG - cumulative;
  rows.push({
    interval: SUBSEQUENT_INTERVAL_LABELS[3],
    rateMgPerKgMin: SUBSEQUENT_RATES_MG_KG_MIN[3],
    rateMlPerKgMin: SUBSEQUENT_RATES_MG_KG_MIN[3] / CONCENTRATION_MG_PER_ML,
    gramsPerInterval: grams45Plus,
    cumulativeGrams: totalDoseG,
  });

  return rows;
}

/**
 * Run full subsequent infusion calculation.
 */
export function calculateSubsequentInfusion(
  input: FirstInfusionInput
): FirstInfusionResult {
  const { weightKg, doseMgPerKg } = input;
  const totalDose = totalDoseG(weightKg, doseMgPerKg);
  const infusionTimeMinutes = subsequentInfusionTimeMinutes(weightKg, totalDose);
  const scheduleRows = buildSubsequentInfusionSchedule(
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
