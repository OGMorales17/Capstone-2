const express = require("express");
const { restart } = require("nodemon");
const router = express.Router({ mergeParams: true });



router.get("/", async function (req, res, next) {

    const { parse } = require('rss-to-json');

    const rss = await parse('https://cointelegraph.com/rss');
    res.json(rss);
});

// router.get("/education", async function (req, res, next) {

//     const { parse } = require('rss-to-json');

//     const rss = await parse('https://www.youtube.com/feeds/videos.xml?playlist_id=PLmOv2_vzOoGcTirwpJoyhGrYRnv1CRyIa');
//     res.json(rss);
// });



// for the videos https://www.youtube.com/embed/sFVW5jhbWtg
//  <iframe src='https://www.youtube.com/embed/sFVW5jhbWtg' />



module.exports = router;

// npm run dev





























// parse('https://blog.ethereum.org/feed.xml').then(rss => {
//     console.log(JSON.stringify(rss, null, 3));
// });


// router.get("/", async function (req, res, next) {
//     const q = req.query;
//     // arrive as strings from querystring, but we want as int/bool
//     var axios = require("axios").default;

//     var options = {
//         method: 'GET',
//         url: 'https://crypto-news-live.p.rapidapi.com/news/coindesk',
//         headers: {
//             'x-rapidapi-host': 'crypto-news-live.p.rapidapi.com',
//             'x-rapidapi-key': 'bfdc90f298msh7f6f724957af063p18a542jsnf1fb974d59f6'
//         }
//     };

//     axios.request(options).then(function (response) {
//         res.json(response.data);
//     }).catch(function (error) {
//         console.error(error);
//     });
// });