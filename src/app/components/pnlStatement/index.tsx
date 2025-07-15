"use client";

import { formatCurrency, formatDate } from "@/helpers/helpers";
import styles from "./index.module.scss";

interface PnLCategoryResult {
    category: string;
    value: number;
}

interface PnLResult {
    fromDate: number;
    toDate: number;
    totalIncome: number;
    totalExpenses: number;
    nett: number;
    nettByCategory: PnLCategoryResult[];
}

interface Props {
    statementData: PnLResult;
}

export default function PnLResults({ statementData }: Props) {

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Profit & Loss Summary</h2>
            <p className={styles.dateRange}>
                From <strong>{formatDate(statementData.fromDate)}</strong> to{" "}
                <strong>{formatDate(statementData.toDate)}</strong>
            </p>

            <div className={styles.summary}>
                <div className={styles.item}>
                    <span>Total Income</span>
                    <strong className={styles.income}>{formatCurrency(statementData.totalIncome)}</strong>
                </div>
                <div className={styles.item}>
                    <span>Total Expenses</span>
                    <strong className={styles.expense}>{formatCurrency(statementData.totalExpenses)}</strong>
                </div>
                <div className={styles.item}>
                    <span>Net Profit</span>
                    <strong className={statementData.nett >= 0 ? styles.income : styles.expense}>
                        {formatCurrency(statementData.nett)}
                    </strong>
                </div>
            </div>

            <div className={styles.categoryBreakdown}>
                <h3>Breakdown by Category</h3>
                <ul>
                    {statementData.nettByCategory.map(({ category, value }) => (
                        <li key={category}>
                            <span>{category}</span>
                            <span
                                className={
                                    value >= 0 ? styles.income : styles.expense
                                }
                            >
                                {formatCurrency(value)}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
