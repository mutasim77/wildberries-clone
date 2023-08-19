import { IProduct } from "../types";

export const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: "USD"
    }).format(price);
}

export const shuffleArray = (array: IProduct[]): IProduct[] => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}

export const calculateDiscount = (price: number, discountPercentage: number): number => {
    return price - (price * (discountPercentage / 100));
}