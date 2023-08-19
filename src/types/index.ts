export interface IProduct {
    id: number;
    category: string;
    images: string[],
    title: string;
    price: number;
    brand: string;
    discountPercentage: number;
    rating?: number;
    discountedPrice?: number;
}

