export const parseCSV = (csv: string): string[][] => {
  return csv
    .trim()
    .split("\n")
    .map((line) => line.split(",").map((value) => value.trim()));
}

export const isNumeric = (value: string): boolean => {
  return !isNaN(parseFloat(value)) && isFinite(Number(value));
}