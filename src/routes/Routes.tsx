import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '@/pages/login/Login'
import Register from '@/pages/register/Register'
import Global from '@/pages/global/Global'
import LoadingSpinner from '@/components/loading_spinner/LoadingSpinner'
import ForgotPassword from '@/pages/forgot_password/ForgotPassword'
import Mansory from '@/components/mansory/Mansory'
import Example from '@/components/example/Example'
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Global />} />
        <Route path="login" element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='loading' element={<LoadingSpinner />} />
        <Route path='forgot-password' element={<ForgotPassword />} />
        <Route path='mansory' element={<Mansory />} />
        <Route path='example' element={<Example />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router