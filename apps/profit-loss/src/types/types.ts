export interface PnLCategoryResult {
    category: string;
    value: number;
}

export interface PnLResult {
    fromDate: number;
    toDate: number;
    totalIncome: number;
    totalExpenses: number;
    nett: number;
    nettByCategory: PnLCategoryResult[];
}