import { processCSVStatement } from "./csv/parseCSVStatement";

(() => {
    console.log("Finance Library loaded.");

    const parser = {
        processCSVStatement
    };

    (window as any).Parser = parser;
})();


