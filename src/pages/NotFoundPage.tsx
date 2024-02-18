import React from 'react';
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../resources/routes-constants'
import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

const NotFoundPage: React.FC = () => {
    const navigate = useNavigate()

    const event = {
        redirectToHomePage: () => {
            navigate(ROUTES.HOMEPAGE_ROUTE)
        }
    }

    return (

        <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundColor: "red",
        }}
      >
        <Typography variant="h1" style={{ color: 'white' }}>
          404
        </Typography>
        <Typography variant="h6" style={{ color: 'white' }}>
          The page you’re looking for doesn’t exist.
        </Typography>
        <Button variant="contained" onClick={() => event.redirectToHomePage()}>Back Home</Button>
      </Box>
    )
}

export default NotFoundPage
