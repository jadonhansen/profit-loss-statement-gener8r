import { PnLResult } from "./types";

export { };

declare global {
    interface Window {
        Parser?: {
            processCSVStatement: (csv: string) => PnLResult
        };
    }
}
