import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/apiURL";
import { IProduct } from "../types";
import { STATUS } from "../utils/status";

interface ProductState {
    products: IProduct[];
    productsStatus: string;
    productSingle: IProduct;
    productSingleStatus: string;
}

const initialState: ProductState = {
    products: [],
    productsStatus: STATUS.IDLE,
    productSingle: {
        id: 1,
        category: '',
        images: [],
        title: '',
        price: 0,
        brand: '',
        discountPercentage: 0
    },
    productSingleStatus: STATUS.IDLE
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAsyncProducts.pending, (state) => {
                state.productsStatus = STATUS.LOADING;
            })

            .addCase(fetchAsyncProducts.fulfilled, (state, action: PayloadAction<IProduct[]>) => {
                state.products = action.payload;
                state.productsStatus = STATUS.SUCCEEDED;
            })

            .addCase(fetchAsyncProducts.rejected, (state) => {
                state.productsStatus = STATUS.FAILED
            })

            .addCase(fetchAsyncProductSingle.pending, (state) => {
                state.productSingleStatus = STATUS.LOADING;
            })

            .addCase(fetchAsyncProductSingle.fulfilled, (state, action: PayloadAction<IProduct>) => {
                state.productSingle = action.payload;
                state.productSingleStatus = STATUS.SUCCEEDED;
            })

            .addCase(fetchAsyncProductSingle.rejected, (state) => {
                state.productSingleStatus = STATUS.FAILED;
            })
    }
});

// getting the products list with limited numbers
export const fetchAsyncProducts = createAsyncThunk('products/fetch', async (limit: number) => {
    const response = await fetch(`${BASE_URL}products?limit=${limit}`);
    const data = await response.json();
    return data.products;
});

// getting the single product data also
export const fetchAsyncProductSingle = createAsyncThunk('product-single/fetch', async (id: string | undefined) => {
    const response = await fetch(`${BASE_URL}products/${id}`);
    const data = await response.json();
    return data;
});

export const getAllProducts = (state: { product: ProductState }): IProduct[] => state.product.products;
export const getAllProductsStatus = (state: { product: ProductState }) => state.product.productsStatus;
export const getProductSingle = (state: { product: ProductState }) => state.product.productSingle;
export const getSingleProductStatus = (state: { product: ProductState }) => state.product.productSingleStatus;

export default productSlice.reducer;