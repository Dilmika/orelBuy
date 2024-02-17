import React from 'react'
import style from './HomePage.module.scss'
import { authSelector } from '../../store/reducers/authSlice'
import { useSelector } from 'react-redux'

const HomePage: React.FC = () => {

    const { userProfile } = useSelector(authSelector);
	console.log("LOG: HomePage:React.FC -> userProfile", userProfile)

    return (
        <div className={style.component}>
            <h1>Hello world!</h1>
        </div>
    )
}

export default HomePage
