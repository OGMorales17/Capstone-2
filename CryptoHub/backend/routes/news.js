const express = require("express");
const router = express.Router({ mergeParams: true });


router.get("/", async (req, res, next) => {
    try {
        const { parse } = require('rss-to-json');
        const rss = await parse('https://cointelegraph.com/rss');

        const items = rss.items.map((i) => ({
            author: i.author,
            link: i.link,
            title: i.title,
            description: i.description.replace(/(<([^>]+)>)/gi, ""),
            author: i.author,
            media: i.media.thumbnail.url
        }))
        res.json(items)
    } catch (err) {
        return next(err)
    }
});


module.exports = router;

// npm run dev
