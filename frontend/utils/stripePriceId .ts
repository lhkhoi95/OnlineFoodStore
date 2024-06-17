const priceIds = [
    {
        productId: '64e410703edf8a4a8678f23e',
        name: 'Vina Tofu',
        priceId: 'price_1Nl281A46IywFxHai3t1rfUP',
    },
    {
        productId: '64e40b3a3edf8a4a8678f219',
        name: 'Vina Saigon Sunrise',
        priceId: 'price_1Nl27sA46IywFxHaB8X7Dw0s',
    },
    {
        productId: '64e44e5d3edf8a4a8678f81f',
        name: 'Vina PinkHouse',
        priceId: 'price_1Nl27gA46IywFxHa3U6rb3n5',
    },
    {
        productId: '64e40aba3edf8a4a8678f1f5',
        name: 'Vina Milo',
        priceId: 'price_1Nl27RA46IywFxHag7JQw47n',
    },
    {
        productId: '64e410c63edf8a4a8678f241',
        name: 'Vina Half & Half',
        priceId: 'price_1Nl26xA46IywFxHaiZJTrgAK',
    },
    {
        productId: '64e409953edf8a4a8678f1ae',
        name: 'Vina GreenTea',
        priceId: 'price_1Nkx67A46IywFxHaDKQyQ7X2',
    }
];

export const getStripePriceId = (productId: string) => {
    const foundPriceId = priceIds.find((priceId) => priceId.productId === productId);
    if (foundPriceId) {
        return foundPriceId.priceId;
    }

    return undefined;
}