export default function stringToUSCurrency(amount: number) {
    const formattedAmount = amount.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });

    return formattedAmount
}

