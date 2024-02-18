import React, { useEffect, useState } from 'react'
import style from '../pages/HomePage/HomePage.module.scss'
import { useSelector } from 'react-redux'
import { Box, Button, Grid } from '@mui/material'
import InfiniteScroll from 'react-infinite-scroll-component'
import Item from './Item'
import { productApi } from '../utility/api'
import { toast } from 'react-toastify'

const ItemList: React.FC = () => {

    const [items, setItems] = useState<any[]>([])
    const [itemAmount, setItemAmount] = useState(1)

    const fetchMoreData = async () => {

        try {
            const { data, status } = await productApi.get(`/recommend/items?page=${itemAmount}`)

            if (status === 200) {
                if (itemAmount === 1) {
                    setItems(data?.data?.products)
                    setItemAmount(itemAmount + 1)
                } else {
                        setItems( (prevItems) => [...prevItems, ...data.data.products])
                        setItemAmount(itemAmount + 1)
                }
            }
        } catch (error) {
			toast.error('Error occured while fetching products')
        }
    }

    useEffect(() => {
        fetchMoreData()
    }, [])

    return (
        <div id="scrollableDiv" style={{ height: 600, overflow: "auto" }}>
            <InfiniteScroll 
            dataLength={items.length}
            next={fetchMoreData}
            hasMore={true}
            loader={<h4>Loading...</h4>}
            height={600}
            >
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        {items.map((i, index) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} className={style.itemWrap} key={index} onClick={() => {console.log("asdasdasd")}}>
                            <Item item={i} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>

            </InfiniteScroll>
        </div>
    )
}

export default ItemList
