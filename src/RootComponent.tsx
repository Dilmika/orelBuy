import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import { ROUTES } from './resources/routes-constants'
import './styles/main.scss'
import SignIn from './pages/SignIn/SignIn'
import { ToastContainer } from 'react-toastify'
import Navbar from './pages/Navbar/Navbar'
import { authSelector } from './store/reducers/authSlice'
import { useSelector } from 'react-redux'
import PrivateRoutes from './utility/protectedRoutes/ProtectedRoute'

const RootComponent: React.FC = () => {

    const {userAuthenticated} = useSelector(authSelector);

    return (
        <>
        <ToastContainer/>
        <Router>
        {userAuthenticated && <Navbar/>}
            <Routes>
                <Route path="*" element={<NotFoundPage />} />
                <Route element={<SignIn />} path={ROUTES.SIGN_IN} />
                <Route element={<PrivateRoutes />}>
                <Route element={<HomePage/>} path={ROUTES.HOMEPAGE_ROUTE}/>
                </Route>
            </Routes>
        </Router>
        </>
    )
}

export default RootComponent
