/**
 * Returns a timestamp in the format `01 Jun 2025`
 */
export const formatDate = (timestamp: number) =>
    new Date(timestamp).toLocaleDateString("en-ZA", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

/**
 * Returns a formatted amount with the currency e.g. `R200.12`.
 * 
 * Currency defaults to `R`.
 */
export const formatCurrency = (value: number, currency?: string) => {

    if (currency) {
        return `${currency}${value.toFixed(2)}`;
    }

    return `R${value.toFixed(2)}`;
}
