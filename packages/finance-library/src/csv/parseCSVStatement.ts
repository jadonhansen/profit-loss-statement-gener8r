import type { PnLResult } from "../types";

import Papa from "papaparse";


export function processCSVStatement(csvText: string): PnLResult {
  const parsed = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: "greedy",
    dynamicTyping: true,
    transformHeader: (header) => header.trim().toLowerCase(),
  });

  if (parsed.errors.length > 0) {
    throw new Error("CSV parsing failed: " + parsed.errors[0].message);
  }

  const rows = parsed.data as Record<string, any>[];

  let totalIncome = 0;
  let totalExpenses = 0;
  let fromDate: number | undefined;
  let toDate: number | undefined;

  const categoryTotals: Record<string, number> = {};

  for (const row of rows) {
    const amount = typeof row["amount"] === "number" ? row["amount"] : parseFloat(row["amount"]);
    const category = row["category"]?.toString().trim() || "Uncategorized";
    const date = new Date(row["date"]).getTime();

    if (isNaN(date) || isNaN(amount)) continue;

    if (!fromDate || date < fromDate) fromDate = date;
    if (!toDate || date > toDate) toDate = date;

    if (amount > 0) totalIncome += amount;
    else totalExpenses += Math.abs(amount);

    categoryTotals[category] = (categoryTotals[category] || 0) + amount;
  }

  const nettByCategory = Object.entries(categoryTotals).map(([category, value]) => ({
    category,
    value: parseFloat(value.toFixed(2)),
  }));

  return {
    fromDate: fromDate ?? 0,
    toDate: toDate ?? 0,
    totalIncome: parseFloat(totalIncome.toFixed(2)),
    totalExpenses: parseFloat(totalExpenses.toFixed(2)),
    nett: parseFloat((totalIncome - totalExpenses).toFixed(2)),
    nettByCategory,
  };
}
