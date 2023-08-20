import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './sidebarSlice';
import categoryReducer from './categorySlice';
import productReducer from './productSlice';
import cartReducer from './cartSlice';
import searchReducer from './searchSlice';

const store = configureStore({
    reducer: {
        sidebar: sidebarReducer,
        category: categoryReducer,
        product: productReducer,
        cart: cartReducer,
        search: searchReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store;
