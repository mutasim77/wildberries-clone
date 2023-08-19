import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/apiURL";
import { STATUS } from "../utils/status";
import { IProduct } from "../types";

interface CategoryState {
    categories: string[];
    categoriesStatus: string;
    categoryProducts: IProduct[];
    categoryProductsStatus: string;
}

const initialState: CategoryState = {
    categories: [],
    categoriesStatus: STATUS.IDLE,
    categoryProducts: [],
    categoryProductsStatus: STATUS.IDLE
}

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAsyncCategories.pending, (state) => {
                state.categoriesStatus = STATUS.LOADING;
            })

            .addCase(fetchAsyncCategories.fulfilled, (state, action: PayloadAction<string[]>) => {
                state.categories = action.payload;
                state.categoriesStatus = STATUS.SUCCEEDED;
            })

            .addCase(fetchAsyncCategories.rejected, (state) => {
                state.categoriesStatus = STATUS.FAILED;
            })

            .addCase(fetchAsyncProductsOfCategory.pending, (state) => {
                state.categoryProductsStatus = STATUS.LOADING;
            })

            .addCase(fetchAsyncProductsOfCategory.fulfilled, (state, action: PayloadAction<IProduct[]>) => {
                state.categoryProducts = action.payload;
                state.categoryProductsStatus = STATUS.SUCCEEDED;
            })

            .addCase(fetchAsyncProductsOfCategory.rejected, (state) => {
                state.categoryProductsStatus = STATUS.FAILED;
            })
    }
});

export const fetchAsyncCategories = createAsyncThunk('categories/fetch', async () => {
    const response = await fetch(`${BASE_URL}products/categories`);
    const data = await response.json();
    return data;
});

export const fetchAsyncProductsOfCategory = createAsyncThunk('category-products/fetch', async (category: string | undefined) => {
    const response = await fetch(`${BASE_URL}products/category/${category}`);
    const data = await response.json();
    return data.products;
});

export const getAllCategories = (state: { category: CategoryState }) => state.category.categories;
export const getAllProductsByCategory = (state: { category: CategoryState }) => state.category.categoryProducts;
export const getCategoryProductsStatus = (state: { category: CategoryState }) => state.category.categoryProductsStatus;

export default categorySlice.reducer;