import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import prof from '../static/hot_prof.jpg'

export default function ImgMediaCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="hot prof"
        height="500"
        image={prof}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          What is a Matrix?
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Learn about Linear Algebra today. Best homework gets to date me.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Go to lecture</Button>
      </CardActions>
    </Card>
  );
}