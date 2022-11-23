import { Fragment } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const NewsLayout = (props) => {
    //const articles = props.news.articles;
    const { url, urlToImage, title, content, description } = props;
    const handleReadMore = (url) => {
        const newTab = window.open(url, '_blank', 'noopener,noreferrer');
        if (newTab) newTab.opener = null;
    }
    return (
        <Fragment>
            <>
                <Card sx={{ maxWidth: 745 }} >
                    <CardMedia
                        component="img"
                        alt={title}
                        height="140"
                        image={urlToImage}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {content}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={() => handleReadMore(url)}>Read More</Button>
                    </CardActions>
                </Card>
                <br />
            </>
        </Fragment>
    )
}

export default NewsLayout;