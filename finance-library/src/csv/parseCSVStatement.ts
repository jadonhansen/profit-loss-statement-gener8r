import type { PnLResult } from "../types";
import { isNumeric, parseCSV } from "./helpers";


export const processCSVStatement = (csv: string): PnLResult => {
  const rows = parseCSV(csv);
  const [header, ...data] = rows;

  const dateIdx = header.findIndex((h) => h.toLowerCase() === 'date');
  const amountIdx = header.findIndex((h) => h.toLowerCase() === 'amount');
  const categoryIdx = header.findIndex((h) => h.toLowerCase() === 'category');

  if (dateIdx === -1 || amountIdx === -1 || categoryIdx === -1) {
    throw new Error('CSV must contain Date, Amount, and Category columns');
  }

  let totalIncome = 0;
  let totalExpenses = 0;
  let fromDate: number | null = null;
  let toDate: number | null = null;
  const categoryTotals: Record<string, number> = {};

  for (const row of data) {
    const dateStr = row[dateIdx];
    const amountStr = row[amountIdx];
    const category = row[categoryIdx] || 'Uncategorized';

    if (!isNumeric(amountStr)) continue;

    const amount = parseFloat(amountStr);
    const date = new Date(dateStr).getTime();
    if (isNaN(date)) continue;

    if (fromDate === null || date < fromDate) fromDate = date;
    if (toDate === null || date > toDate) toDate = date;

    if (amount > 0) totalIncome += amount;
    else totalExpenses += Math.abs(amount);

    categoryTotals[category] = (categoryTotals[category] || 0) + amount;
  }

  const nettByCategory = Object.entries(categoryTotals).map(([category, value]) => ({
    category,
    value: parseFloat(value.toFixed(2)),
  }));

  return ({
    fromDate: fromDate ?? 0,
    toDate: toDate ?? 0,
    totalIncome: parseFloat(totalIncome.toFixed(2)),
    totalExpenses: parseFloat(totalExpenses.toFixed(2)),
    nett: parseFloat((totalIncome - totalExpenses).toFixed(2)),
    nettByCategory,
  });
}
