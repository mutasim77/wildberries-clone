import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/apiURL";
import { STATUS } from "../utils/status";
import { IProduct } from "../types";

interface SearchProps {
    searchProducts: IProduct[],
    searchProductsStatus: string;
}

const initialState: SearchProps = {
    searchProducts: [],
    searchProductsStatus: STATUS.IDLE
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        clearSearch: (state) => {
            state.searchProducts = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAsyncSearchProduct.pending, (state) => {
                state.searchProductsStatus = STATUS.LOADING;
            })

            .addCase(fetchAsyncSearchProduct.fulfilled, (state, action: PayloadAction<IProduct[]>) => {
                state.searchProducts = action.payload;
                state.searchProductsStatus = STATUS.SUCCEEDED;
            })

            .addCase(fetchAsyncSearchProduct.rejected, (state) => {
                state.searchProductsStatus = STATUS.FAILED;
            })
    }
});

export const fetchAsyncSearchProduct = createAsyncThunk('product-search/fetch', async (searchTerm: string | undefined) => {
    const response = await fetch(`${BASE_URL}products/search?q=${searchTerm}`);
    const data = await response.json();
    return data.products;
});

export const { clearSearch } = searchSlice.actions;
export const getSearchProducts = (state: { search: SearchProps }) => state.search.searchProducts;
export const getSearchProductsStatus = (state: { search: SearchProps }) => state.search.searchProductsStatus;

export default searchSlice.reducer;