import { defineConfig } from "vite";

export default defineConfig({
    build: {
        lib: {
            entry: "src/index.ts",
            name: "FinanceLib",
            fileName: () => "finance-lib.js",
            formats: ["iife"],
        },
        outDir: "../public",
        emptyOutDir: false
    }
});