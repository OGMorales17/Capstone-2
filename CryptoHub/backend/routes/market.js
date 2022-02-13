const express = require("express");
const axios = require('axios')
const router = express.Router({ mergeParams: true });

const CoinGecko = require('coingecko-wrapper-api');


router.get("/search", async (req, res, next) => {
    try {
        const CoinGeckoClient = new CoinGecko();
        // const data = await CoinGeckoClient.coins.fetchTickers('beavis-and-butthead')
        const data = await CoinGeckoClient.coins.fetchTickers('compound-ether')
        // const data = await CoinGeckoClient.coins.fetchTickers('crypto-com-chain')
        // let data = await CoinGeckoClient.coins.markets();

        res.json(data)
    } catch (err) {
        console.log(err)
    }
});

router.get("/exchanges", async (req, res, next) => {
    try {
        const CoinGeckoClient = new CoinGecko();
        const data = await CoinGeckoClient.exchanges.all()


        res.json(data)
    } catch (err) {
        console.log(err)
    }
});
// router.get("/all_tokens", async (req, res, next) => {
//     try {
//         const CoinGeckoClient = new CoinGecko();
//         const data = await CoinGeckoClient.coins.list();

//         res.json(data)
//     } catch (err) {
//         console.log(err)
//     }
// });



// Get the top 250 coins by market cap
router.get("/", async (req, res, next) => {
    try {
        const { data } = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false');
        const items = data.map((c) => ({
            rank: c.market_cap_rank,
            name: c.name,
            id: c.id,
            symbol: c.symbol.toUpperCase(),
            image: c.image,
            price: c.current_price || 0,
            percentage_change_24h: c.price_change_percentage_24h || 0,
            price_change_24h: c.price_change_24h || 0,
            total_volume: c.total_volume, // 24 hr vol
            market_cap: c.market_cap,
        }))
        res.json(items)
        // res.json(data)
    } catch (err) {
        console.log(err)
    }
});

// Get the deatails of the token
router.get("/details/:token", async (req, res, next) => {

    try {
        const CoinGeckoClient = new CoinGecko();
        const { token } = req.params
        const data = await CoinGeckoClient.coins.fetch(`${token}`, { sparkline: true });

        const item = {
            name: data.data.name,
            id: data.data.symbol.toUpperCase(),
            price: data.data.market_data.current_price.usd,
            rank: data.data.market_cap_rank,
            market_cap: data.data.market_data.market_cap.usd,
            image: data.data.image.thumb,
            total_volume: data.data.market_data.total_volume.usd,

            high_24h: data.data.market_data.high_24h.usd,
            low_24h: data.data.market_data.low_24h.usd,

            ath: data.data.market_data.ath.usd,
            ath_date: data.data.market_data.ath_date.usd,

            atl: data.data.market_data.atl.usd,
            atl_date: data.data.market_data.atl_date.usd,

            homepage: data.data.links.homepage[0],

            categories: data.data.categories[0],
            price_change_percentage_24h: data.data.market_data.price_change_percentage_24h,
            price_change_percentage_7d: data.data.market_data.price_change_percentage_7d,
            price_change_percentage_14d: data.data.market_data.price_change_percentage_14d,
            price_change_percentage_30d: data.data.market_data.price_change_percentage_30d,
            price_change_24h: data.data.market_data.price_change_24h,
            description: data.data.description.en.replace(/(<([^>]+)>)/gi, "").replace(/\r\n/g, ''),

            tickers: data.data.tickers,
        }



        res.json(item)
        // res.json(data)
    } catch (err) {
        console.log(err)
    }
});

// Get top trending coins
router.get("/trend", async (req, res, next) => {
    try {
        const CoinGeckoClient = new CoinGecko();
        let data = await CoinGeckoClient.trend();

        res.json(data)
    } catch (err) {
        console.log(err)
    }
});

// Get all categories
router.get("/categories", async (req, res, next) => {
    try {
        const { data } = await axios.get('https://api.coingecko.com/api/v3/coins/categories');
        res.json(data)
    } catch (err) {
        console.log(err)
    }

});


module.exports = router;




