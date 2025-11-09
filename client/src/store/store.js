import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../store/auth-slice/index.js'
import AdminProductSlice from './admin/product-slice/index.js'
import ShopProductSlice from './shop/product-slice/index.js'
import shoppingCartSlice from './shop/cart-slice/index.js'
import addressSlice from './shop/address-slice'
import shopOrderSlice from './shop/order-slice'


const store = configureStore({
    reducer:{
        auth:authReducer,
        adminProducts:AdminProductSlice,
        shopProduct: ShopProductSlice,
        shopCart:shoppingCartSlice,
        shopAddress: addressSlice,
        shopOrder : shopOrderSlice
    }
})

export default store;