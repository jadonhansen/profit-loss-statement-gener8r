import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

import styles from "./index.module.scss";
import { PnLResult } from "@/types/types";

interface Props {
    statementData: PnLResult;
}

export default function CategoryGraph({ statementData }: Props) {

    const pieChartData = {
        ...statementData,
        nettByCategory: statementData.nettByCategory
            .filter((item) => item.value !== 0)
            .map((item) => ({
                ...item,
                absoluteValue: Math.abs(item.value),
            }))
    }

    return (
        <div className={styles.chartContainer}>
            <h3>Category Distribution</h3>

            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={pieChartData.nettByCategory}
                        dataKey="absoluteValue"
                        nameKey="category"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        label={({ category }) => category}

                    >
                        {pieChartData.nettByCategory.map((entry, index) => (
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