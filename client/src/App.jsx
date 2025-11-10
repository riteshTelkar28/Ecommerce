
import React, { useEffect } from 'react'

import './App.css'
import { Route, Routes } from 'react-router-dom'
import AuthLayout from './components/auth/Layout'
import AuthLogin from './pages/auth/login'
import AuthRegister from './pages/auth/register'
import AdminLayout from './components/admin-view/layout'
import AdminDashboard from './pages/admin-view/dashboard'
import AdminOrders from './pages/admin-view/orders'
import AdminProducts from './pages/admin-view/products'
import ShoppingLayout from './components/shopping-view/layout'
import NotFound from './pages/not-found'
import ShoppingHome from './pages/shopping-view/home'
import ShoppingAccount from './pages/shopping-view/account'
import ShoppingCheckout from './pages/shopping-view/checkout'
import ShoppingListings from './pages/shopping-view/listing'
import CheckAuth from './components/common/check-auth'
import UnauthPage from './pages/unauth-page/unauth-page'
import { useDispatch, useSelector } from 'react-redux'
import { authenticateUser } from './store/auth-slice'
import PaypalReturnPage from './pages/shopping-view/paypal-return'
import PaymentSuccess from './pages/shopping-view/payment-success'

function App() {
const {isAuthenticated,user,isLoading} = useSelector(state=> state.auth)
const dispatch = useDispatch()


useEffect(()=>{
    dispatch(authenticateUser())
},[dispatch])
if(isLoading) return <div>Loading....</div>;

  return (
      <div className='flex flex-col overflow-hidden bg-white'>
        <Routes>
          <Route path='/auth' element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout/>
            </CheckAuth>
          }>
            <Route path='login' element={<AuthLogin/>}/>
            <Route path='register' element={<AuthRegister/>}/>          
          </Route>

          <Route path='/admin' element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout/>
            </CheckAuth>
          } >
            <Route path='dashboard' element={<AdminDashboard/>}/>
            <Route path='orders' element={<AdminOrders/>}/>
            <Route path='products' element={<AdminProducts/>}/>
            
          </Route>
          <Route path='/shop' element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout/>
            </CheckAuth>
          }>
            <Route path='home' element={<ShoppingHome/>} />
            <Route path='account' element={<ShoppingAccount/>} />
            <Route path='checkout' element={<ShoppingCheckout/>} />
            <Route path='listing' element={<ShoppingListings/>} />
            <Route path='paypal-return' element={<PaypalReturnPage/>} />
            <Route path='payment-success' element={<PaymentSuccess/>} />
          </Route>
          <Route path='*' element={<NotFound/>} />
          <Route path='/unauth-page' element={<UnauthPage/>} />
        </Routes>
      </div>
  )
}

export default App
