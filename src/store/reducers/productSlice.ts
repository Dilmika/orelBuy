import { createSlice } from "@reduxjs/toolkit";

interface ProductInterface {
    products : any [],
}

const initialState: ProductInterface =  {
    products : [],
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        allProductsAction: (state, { payload }) => {
            state.products = payload;
        },
        resetProductStateAction: (state) => {
            Object.assign(state, initialState);
        },
    }
})

export const {
    allProductsAction,
    resetProductStateAction,
} = productSlice.actions;

export const productSelector = (state : any) => state.product;

export default productSlice.reducer;