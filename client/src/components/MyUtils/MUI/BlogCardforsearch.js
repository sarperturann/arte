import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {
    Link
} from 'react-router-dom'

const BlogCardforsearch = ({ data }) => {
    return (
        <Card sx={{ maxWidth: 285, backgroundColor : "#e3e3e3" }}>
            <CardMedia
                sx={{ height: 180 }}
                image={data.img}
                title={data.title}
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    {data.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {data.description.slice(0, 100)}...
                </Typography>
            </CardContent>
            <CardActions>
                <Link to={`/blog/${data._id}`} state={{ data }}>
                    <Button size="small">Read More</Button>
                </Link>
            </CardActions>
        </Card>
    );
}

export default BlogCardforsearch;