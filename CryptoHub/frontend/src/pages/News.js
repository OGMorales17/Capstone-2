import React, { useState, useEffect } from "react";
import CryptoHubApi from "../api";
import CircularProgressWithLabel from "../utilities/Loading";
import { makeStyles } from '@material-ui/core/styles'
import Container from "@material-ui/core/Container";
import Box from '@mui/material/Box';
import { TickerTape } from "react-ts-tradingview-widgets";
import Banner from "../components/Banner";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActionArea,
  CardMedia,
} from '@mui/material';

const tickeTapeSymbols = [
  {
    "proName": "FOREXCOM:SPXUSD",
    "title": "S&P 500"
  },
  {
    "proName": "FOREXCOM:NSXUSD",
    "title": "US 100"
  },
  {
    "proName": "FX_IDC:EURUSD",
    "title": "EUR/USD"
  },
  {
    "proName": "BITSTAMP:BTCUSD",
    "title": "Bitcoin"
  },
  {
    "proName": "BITSTAMP:ETHUSD",
    "title": "Ethereum"
  },
  {
    "description": "Cardano",
    "proName": "COINBASE:ADAUSD"
  }
]

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(),
  },
  seeMore: {
    marginTop: theme.spacing(3)
  },
}))

export default function News() {
  const [news, setNews] = useState(null);
  const classes = useStyles()

  useEffect(function getNewsOnMount() {
    console.debug("NewsList useEffect getNewsOnMount");
    search();
  }, []);

  async function search() {
    let news = await CryptoHubApi.getNews();
    setNews(news);
  }

  if (!news) return <CircularProgressWithLabel />;

  return (
    <div className={classes.root}>
      <Banner text={'Get all the Info regarding your favorite Crypto Currency'} />
      <Box sx={{ pt: 8 }}>  {/* By removing this open and closing Box on the botton  */}
        <Container maxWidth="lg" className={classes.container}> {/* By removing this open and closing Container on the botton the Cards will take full wide */}
          <Box sx={{ pb: 2 }}>
            <TickerTape colorTheme="dark" displayMode="regular" symbols={tickeTapeSymbols} ></TickerTape> {/* Move tis Tiker with the Boxes inside Container to keep it same side wide of the cards */}
          </Box>
          <Grid
            container
            spacing={4}
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            {news.map(n => (
              <Grid sx={{ width: '25%' }} item xs={12} sm={6} md={4} key={news.indexOf(n)}>
                <a href={n.link} style={{ textDecoration: 'none' }}>
                  <CardActionArea >
                    <Card style={{ background: 'transparent' }}>
                      <CardMedia
                        component="img"
                        height="300"
                        image={n.media}
                      />
                      <CardContent style={{ textDecoration: 'none' }}>
                        <Typography variant="h6" gutterBottom>
                          {n.title}
                        </Typography>
                        <Typography variant="body3" color="text.secondary">
                          {n.description}
                        </Typography>
                        <Typography variant="h5" color="inherit" noWrap>
                          &nbsp;
                        </Typography>
                        <Typography style={{ wordWrap: "break-word", display: 'block' }}>{n.author}</Typography>
                      </CardContent>
                    </Card>
                  </CardActionArea>
                </a>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box >
    </div>


  )
}


