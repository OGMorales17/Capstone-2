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

router.get("/:token", async (req, res, next) => {

    try {
        const { parse } = require('rss-to-json');
        const { token } = req.params
        const rss = await parse(`https://www.youtube.com/feeds/videos.xml?playlist_id=${token}`);

        const items = rss.items.map((i) => ({
            id: i.id.split(/yt:video:/).join(""),
            title: i.title,
            description: i.description,
        }))

        res.json(items);
    } catch (err) {
        // console.log(err)
    }
});

// router.get("/sheldom", async (req, res, next) => {
//     try {
//         const { parse } = require('rss-to-json');
//         const rss = await parse('https://www.youtube.com/feeds/videos.xml?playlist_id=PLmOv2_vzOoGcTirwpJoyhGrYRnv1CRyIa');

//         const items = rss.items.map((i) => ({
//             id: i.id.split(/yt:video:/).join(""),
//             title: i.title,
//             description: i.description,
//         }))

//         res.json(items);
//     } catch (err) {
//         console.log(err)
//     }
// });

// router.get("/tradingView", async (req, res, next) => {
//     try {
//         const { parse } = require('rss-to-json');
//         const rss = await parse('https://www.youtube.com/feeds/videos.xml?playlist_id=PLqJjKuP8g79xYlQHDysJS8yHB1YE8Qqje');

//         const items = rss.items.map((i) => ({
//             id: i.id.split(/yt:video:/).join(""),
//             title: i.title,
//             description: i.description,
//         }))

//         res.json(items);
//     } catch (err) {
//         console.log(err)
//     }
// });

// router.get("/candlesticks", async (req, res, next) => {
//     try {
//         const { parse } = require('rss-to-json');
//         const rss = await parse('https://www.youtube.com/feeds/videos.xml?playlist_id=PLqJjKuP8g79x8C1Z-nEIaBjsBUKHh4nxW');

//         const items = rss.items.map((i) => ({
//             id: i.id.split(/yt:video:/).join(""),
//             title: i.title,
//             description: i.description,
//         }))

//         res.json(items);
//     } catch (err) {
//         console.log(err)
//     }
// });

// router.get("/tradingEdu", async (req, res, next) => {
//     try {
//         const { parse } = require('rss-to-json');
//         const rss = await parse('https://www.youtube.com/feeds/videos.xml?playlist_id=PLqJjKuP8g79zEy55pbGPIGc8tMqeSrzFa');

//         const items = rss.items.map((i) => ({
//             id: i.id.split(/yt:video:/).join(""),
//             title: i.title,
//             description: i.description,
//         }))

//         res.json(items);
//     } catch (err) {
//         console.log(err)
//     }
// });


module.exports = router;