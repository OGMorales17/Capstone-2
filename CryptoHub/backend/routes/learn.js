const express = require("express");
const { restart } = require("nodemon");
const router = express.Router({ mergeParams: true });

router.get("/", async function (req, res, next) {
    try {
        const { parse } = require('rss-to-json');

        const rss = await parse('https://www.youtube.com/feeds/videos.xml?playlist_id=PLmOv2_vzOoGcTirwpJoyhGrYRnv1CRyIa');
        res.json(rss);
    } catch (err) {
        console.log(err)
    }
});

// router.get("/", async function (req, res, next) {

//     const { parse } = require('rss-to-json');

//     const rss = await parse('https://www.youtube.com/feeds/videos.xml?playlist_id=PLmOv2_vzOoGcTirwpJoyhGrYRnv1CRyIa');
//     res.json(rss);
// });



// for the videos https://www.youtube.com/embed/sFVW5jhbWtg
//  <iframe src='https://www.youtube.com/embed/sFVW5jhbWtg' />



module.exports = router;