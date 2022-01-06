// const axios = require('axios')
// const cheerio = require('cheerio')
// const { index } = require('cheerio/lib/api/traversing')
// const express = require('express')

// const PORT = process.env.PORT || 3001

// const app = express()

// // axios('https://coinmarketcap.com/alexandria/article')
// //     .then(res => {
// //         const htmlData = res.data
// //         const $ = cheerio.load(htmlData)

// //         const articles = []

// //         $('.sc-bdfBwQ ArticleCard__ArticleBox-sc-4ctgqh-0 iXxiMt jZHrE', htmlData).each((index, element) => {
// //             const titleURL = $(element).children('.sc-gsTCUz ghfBCu').text()
// //             // const title = $(element).children('.sc-bdfBwQ jzZbpr').text()
// //             console.log(title)
// //             articles.push({
// //                 titleURL
// //                 // title
// //             })
// //         })
// //         console.log(articles)
// //     }).catch(err => console.log(err))

// // app.listen(PORT, () => console.log(`Server is listening to port ${PORT}`))




// async function getArticle() {
//     try {
//         const siteUrl = 'https://coinmarketcap.com/alexandria/article'

//         const { data } = await axios({
//             method: 'GET',
//             url: siteUrl
//         })
//         const $ = cheerio.load(data)
//         const elemSelector = '#__next > div.sc-bdfBwQ > div:nth-child(4) > div > div.sc-bdfBwQ.kCWiEv > div.sc-bdfBwQ.Grid-sc-3uwl3g-0.egdQUi.ca-Ddcc > a'
//         // console.log($)
//         $(elemSelector).each((parentIdx, parentElem) => {
//             $(parentElem).children().each((childIdx, childElm) => {
//                 console.log($(childElm).text())
//             })
//         })
//     } catch (err) {
//         console.log(err)
//     }
// }

// getArticle() 

// https://cryptooversee.herokuapp.com/predict