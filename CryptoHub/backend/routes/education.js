const express = require("express");
const { restart } = require("nodemon");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res, next) => {
    try {
        const { parse } = require('rss-to-json');
        const rss = await parse('https://www.youtube.com/feeds/videos.xml?playlist_id=PLmOv2_vzOoGcTirwpJoyhGrYRnv1CRyIa');

        const items = rss.items.map((i) => ({
            id: i.id.split(/yt:video:/).join(""),
            title: i.title,
            description: i.description,
        }))

        res.json(items);
    } catch (err) {
        console.log(err)
    }
});


module.exports = router;