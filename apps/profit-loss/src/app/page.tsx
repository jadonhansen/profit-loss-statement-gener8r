"use client";

import { useState } from "react";
import jsPDF from "jspdf";
import styles from "./page.module.scss";
import { OrbitProgress } from "react-loading-indicators";

import CategoryGraph from "@/components/categoryGraph";
import { PnLResult } from "@/types/types";
import PnLResults from "@/components/pnlStatement";


export default function HomePage() {

  const [result, setResult] = useState<PnLResult | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);


  const generatePDF = (data: PnLResult): void => {
    const pdfDoc = new jsPDF();

    pdfDoc.setFontSize(18);
    pdfDoc.text("Personal Profit and Loss Statement", 20, 20);

    pdfDoc.setFontSize(16);
    pdfDoc.text("Profit & Loss Summary", 20, 40);

    pdfDoc.setFontSize(12);
    pdfDoc.text(`From: ${new Date(data.fromDate).toLocaleDateString()}`, 20, 50);
    pdfDoc.text(`To: ${new Date(data.toDate).toLocaleDateString()}`, 20, 60);
    pdfDoc.text(`Total Income: R${data.totalIncome.toFixed(2)}`, 20, 70);
    pdfDoc.text(`Total Expenses: R${data.totalExpenses.toFixed(2)}`, 20, 80);
    pdfDoc.text(`Net ${data.nett >= 0 ? "Profit" : "Loss"}: R${data.nett.toFixed(2)}`, 20, 90);

    pdfDoc.setFontSize(14);
    pdfDoc.text("Category Breakdown:", 20, 110);

    pdfDoc.setFontSize(12);
    data.nettByCategory.forEach((item, index) => {
      pdfDoc.text(
        `${item.category}: R${item.value.toFixed(2)}`,
        25,
        120 + index * 10
      );
    });

    pdfDoc.save("pnl-summary.pdf");
  }


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
      setError("Error processing CSV file.");
    }

    setLoading(false);
  }


  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.type !== "text/csv") {
      setError("Please upload a CSV file.");
      return;
    }

    setLoading(true);
    setError(undefined);
    setResult(undefined);

    const reader = new FileReader();

    reader.onload = () => parseCSV(reader);

    reader.onerror = () => {
      setError("Could not read CSV file. Please try again.");
      setLoading(false);
    };

    reader.readAsText(file);
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.heading}>Personal Profit and Loss Statement</h1>

      <div className={styles.tooltipWrapper}>
        <label htmlFor="csvInput">Upload CSV File</label>
        <span className={styles.tooltip}>ⓘ
          <span className={styles.tooltipText}>
            Expected format: &quot;Date, Description, Amount, Category&quot;<br />
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

      {loading &&
        <OrbitProgress color="#1d9348" size="small" />
      }

      {result ?
        <>
          <PnLResults statementData={result} />

          <button onClick={() => generatePDF(result)} className={styles.downloadBtn}>
            Download PDF
          </button>

          <CategoryGraph statementData={result} />
        </>
        :
        undefined}
    </main>
  );
}
