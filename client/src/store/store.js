import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../store/auth-slice/index.js'
import AdminProductSlice from './admin/product-slice/index.js'
import ShopProductSlice from './shop/product-slice/index.js'
import shoppingCartSlice from './shop/cart-slice/index.js'

const store = configureStore({
    reducer:{
        auth:authReducer,
        adminProducts:AdminProductSlice,
        shopProduct: ShopProductSlice,
        shopCart:shoppingCartSlice
    }
})

export default store;