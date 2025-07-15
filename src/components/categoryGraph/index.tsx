import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

import styles from "./index.module.scss";
import { PnLResult } from "@/types/types";

interface Props {
    statementData: PnLResult;
}

export default function CategoryGraph({ statementData }: Props) {

    return (
        <div className={styles.chartContainer}>
            <h3>Category Distribution</h3>

            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={statementData.nettByCategory}
                        dataKey="value"
                        nameKey="category"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        label
                    >
                        {statementData.nettByCategory.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={entry.value >= 0 ? "#27a956" : "#d82d2d"}
                            />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}