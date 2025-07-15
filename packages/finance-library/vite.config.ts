import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, "src/index.ts"),
            name: "FinanceLib",
            fileName: () => "finance-lib.js",
            formats: ["iife"],
        },
        outDir: "../../apps/profit-loss/public",
        emptyOutDir: false
    }
});