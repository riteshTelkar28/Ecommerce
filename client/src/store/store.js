import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../store/auth-slice/index.js'
import AdminProductSlice from './admin/product-slice/index.js'
import adminOrderSlice from './admin/order-slice/index.js'
import ShopProductSlice from './shop/product-slice/index.js'
import shoppingCartSlice from './shop/cart-slice/index.js'
import addressSlice from './shop/address-slice'
import shopOrderSlice from './shop/order-slice'
import SearchSlice from './shop/search-slice'
import reviewSlice from './shop/review-slice'
import commonSlice from './common-slice/index.js'
const store = configureStore({
    reducer:{
        auth:authReducer,
        adminProducts:AdminProductSlice,
        adminOrder:adminOrderSlice,
        shopProduct: ShopProductSlice,
        shopCart:shoppingCartSlice,
        shopAddress: addressSlice,
        shopOrder : shopOrderSlice,
        shopSearch:SearchSlice,
        review:reviewSlice,
        commonFeature:commonSlice
    }
})

export default store;