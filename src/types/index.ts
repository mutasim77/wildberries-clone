export interface IProduct {
    id: number;
    category: string;
    images: string[],
    title: string;
    price: number;
    brand: string;
    discountPercentage: number;
    description?: string;
    rating?: number;
    discountedPrice?: number;
    stock?: number | undefined;
    thumbnail?: string;
    quantity?: number;
    totalPrice?: number;
}
