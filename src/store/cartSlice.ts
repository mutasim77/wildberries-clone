import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../types";

const fetchFromLocalStorage = (): IProduct[] => {
    const cart = localStorage.getItem('cart');
    if (cart) {
        return JSON.parse(localStorage.getItem('cart'));
    } else {
        return [];
    }
}

const storeInLocalStorage = (data: IProduct[]) => {
    localStorage.setItem('cart', JSON.stringify(data));
}

interface CartSliceProps {
    carts: IProduct[],
    itemsCount: number;
    totalAmount: number;
    isCartMessageOn: boolean;
}

const initialState: CartSliceProps = {
    carts: fetchFromLocalStorage(),
    itemsCount: 0,
    totalAmount: 0,
    isCartMessageOn: false
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<IProduct>) => {
            const isItemInCart = state.carts.find(item => item.id === action.payload.id);

            if (isItemInCart) {
                const tempCart = state.carts.map(item => {
                    if (item.id === action.payload.id) {
                        const tempQty = item!.quantity + action.payload!.quantity;
                        const tempTotalPrice = tempQty * item.price;

                        return {
                            ...item, quantity: tempQty, totalPrice: tempTotalPrice
                        }
                    } else {
                        return item;
                    }
                });

                state.carts = tempCart;
                storeInLocalStorage(state.carts);
            } else {
                state.carts.push(action.payload);
                storeInLocalStorage(state.carts);
            }
        },

        removeFromCart: (state, action: PayloadAction<number>) => {
            const tempCart = state.carts.filter(item => item.id !== action.payload);
            state.carts = tempCart;
            storeInLocalStorage(state.carts);
        },

        clearCart: (state) => {
            state.carts = [];
            storeInLocalStorage(state.carts);
        },

        getCartTotal: (state) => {
            state.totalAmount = state.carts.reduce((cartTotal, cartItem) => {
                return cartTotal += cartItem.totalPrice
            }, 0);

            state.itemsCount = state.carts.length;
        },

        toggleCartQty: (state, action: PayloadAction<{ id: number, type: string }>) => {
            const tempCart = state.carts.map(item => {
                if (item.id === action.payload.id) {
                    let tempQty = item.quantity;
                    let tempTotalPrice = item.totalPrice;

                    if (action.payload.type === "INC") {
                        tempQty++;
                        if (tempQty === item.stock) tempQty = item.stock;
                        tempTotalPrice = tempQty * item.discountedPrice;
                    }

                    if (action.payload.type === "DEC") {
                        tempQty--;
                        if (tempQty < 1) tempQty = 1;
                        tempTotalPrice = tempQty * item.discountedPrice;
                    }

                    return { ...item, quantity: tempQty, totalPrice: tempTotalPrice };
                } else {
                    return item;
                }
            });

            state.carts = tempCart;
            storeInLocalStorage(state.carts);
        },

        setCartMessageOn: (state) => {
            state.isCartMessageOn = true;
        },

        setCartMessageOff: (state) => {
            state.isCartMessageOn = false;
        }
    }
});

export const {
    addToCart,
    setCartMessageOff,
    setCartMessageOn,
    getCartTotal,
    toggleCartQty,
    clearCart,
    removeFromCart
} = cartSlice.actions;

export const getAllCarts = (state: { cart: CartSliceProps }) => state.cart.carts;
export const getCartItemsCount = (state: { cart: CartSliceProps }) => state.cart.itemsCount;
export const getCartMessageStatus = (state: { cart: CartSliceProps }) => state.cart.isCartMessageOn;

export default cartSlice.reducer;