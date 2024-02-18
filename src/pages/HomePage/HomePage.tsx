import React from 'react'
import style from './HomePage.module.scss'
import { authSelector } from '../../store/reducers/authSlice'
import { useSelector } from 'react-redux'
import Item from '../../components/Item'
import { Box, Container, Grid } from '@mui/material'
import InfiniteScroll from 'react-infinite-scroll-component'
import ItemList from '../../components/ItemList'

const HomePage: React.FC = () => {

    const { userProfile } = useSelector(authSelector);

    return (
        <Container maxWidth="xl">
        <div className={style.component}>
            <ItemList/>
        </div>
        </Container>
    )
}

export default HomePage
