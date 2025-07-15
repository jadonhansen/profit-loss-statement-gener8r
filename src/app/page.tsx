"use client";

import { useState } from "react";

import styles from "./page.module.scss";
import PnLResults from "./components/pnlStatement";
import { PnLResult } from "../../finance-library/src/types";

export default function HomePage() {
  const [result, setResult] = useState<PnLResult | undefined>();
  const [error, setError] = useState<string | undefined>();


  const parseCSV = (reader: FileReader) => {
    const csvText = reader.result as string;

    if (typeof window !== "undefined" && window.Parser) {

      try {
        const output = window.Parser.processCSVStatement(csvText);
        setResult(output);
      } catch (error) {
        setError("Failed to process the CSV file.");
        console.error(error);
      }
    } else {
      console.warn("window.Parser does not exist.");
    }
  }


  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.type !== "text/csv") {
      setError("Please upload a CSV file.");
      return;
    }

    setError(undefined);
    setResult(undefined);

    const reader = new FileReader();

    reader.onload = () => parseCSV(reader);

    reader.onerror = () => {
      setError("Could not read CSV file. Please try again.");
    };

    reader.readAsText(file);
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.heading}>Upload your bank transaction history</h1>

      <div className={styles.tooltipWrapper}>
        <label htmlFor="csvInput">Upload CSV File</label>
        <span className={styles.tooltip}>ⓘ
          <span className={styles.tooltipText}>
            Expected format: "Date, Description, Amount, Category"<br />
            - Dates in YYYY-MM-DD<br />
            - Amounts: positive = income, negative = expense
          </span>
        </span>
      </div>

      <form className={styles.form}>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className={styles.fileInput}
        />
      </form>

      {error && (
        <div className={styles.error}>{error}</div>
      )}

      {result && <PnLResults statementData={result} />}
    </main>
  );
}
