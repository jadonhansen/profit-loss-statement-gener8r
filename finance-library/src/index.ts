(() => {
    console.log("Finance Library loaded");

    const PnLProcessor = {
        processCSV(csv: string) {
            return {
                totalIncome: 0,
                totalExpenses: 0,
                netProfit: 0,
            };
        },
    };

    (window as any).PnLProcessor = PnLProcessor;
})();