import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import { ROUTES } from './resources/routes-constants'
import './styles/main.scss'
import SignIn from './pages/SignIn/SignIn'

const RootComponent: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="*" element={<NotFoundPage />} />
                <Route path={ROUTES.HOMEPAGE_ROUTE} element={<SignIn />} />
                {/* <Route path={ROUTES.SIGN_IN} element={<SignIn />} /> */}
            </Routes>
        </Router>
    )
}

export default RootComponent
