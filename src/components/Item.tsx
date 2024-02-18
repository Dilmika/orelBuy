import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function Item(item:any) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item?.item?.name.length > 16 ? `${item?.item?.name.slice(0, 16)}...` : item?.item?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {/* {item?.item?.shortDescription} */}
        {item?.item?.shortDescription.length > 60 ? `${item?.item?.shortDescription.slice(0, 60)}...` : item?.item?.shortDescription}
        </Typography>
      </CardContent>
      <CardActions>
      <Typography variant="h5" gutterBottom color={"red"}>
        LKR
      </Typography>
        <Typography variant="h5" gutterBottom color={"red"}>
        {item?.item?.price}
      </Typography>
      </CardActions>
    </Card>
  );
}
