"use client";

import React, { useState } from "react";
import styles from "./index.module.scss";

const sampleFiles = [
    { name: "Profit Statement", file: "/statement.csv" },
    { name: "Loss Statement", file: "/statementLoss.csv" },
    { name: "Detailed Statement", file: "/statementDetailed.csv" },
];

export const DownloadSampleButton = () => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className={styles.dropdownContainer}>
            <button
                className={styles.dropdownButton}
                onClick={() => setOpen((prev) => !prev)}
            >
                Download Sample CSV
            </button>

            {open && (
                <ul className={styles.dropdownList}>
                    {sampleFiles.map((file, index) => (
                        <li key={index}>
                            <a
                                href={file.file}
                                download
                                className={styles.dropdownItem}
                                onClick={() => setOpen(false)}
                            >
                                {file.name}
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
