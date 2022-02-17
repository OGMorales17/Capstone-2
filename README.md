# CryptoHub - techical analysis indicators, news, markets, education and more ....



#### <div align='center'>Try the App Here</div>  
#### <div align='center'>https://crypto-hub-dev.herokuapp.com/</div>  


<br>

This project is divided in two, frontend and backend.

The frontend is <a>[CryptoHub](https://crypto-hub-dev.herokuapp.com/),</a> a web app focus on crypto enthusiasts and those interested to learn how to trade.<br>

Home route: Will provide information feed by Tradingview where the users could get a technical analysis on BTC, ETH, and the overall index on the top 5 crypto assets, which could be useful to identify the market direction, Bull or Bear.

News route: Here users can get the most updated news from Cointelegraph in real-time, by clicking on the news card it will be sent to the article in Cointelegraph.

Market route: Users will be able to get the actual price on the top 250 crypto assets, users will also able to filter by name, get details on the specific tokens by clicking on the token, price history and save favorite toke in the local store.

Learn route: By default, this route will show the Sniper Masterclasses from the Crypto Banter youtube channel, but there are others that can be chosen in the autocomplete from the Mind Math Money channel, this video series I found really educational in my opinion.

Tools route: This route still in production
<br>

_**This are some of the Technologies use in the frontend**_

<a>[React.js v17](https://reactjs.org/)</a> <br>
<a>[React Router v6](https://reactrouter.com/)</a> <br>
<a>[React Router DOM](https://www.npmjs.com/package/react-router-dom)</a> <br>
<a>[Axios](https://axios-http.com/docs/intro)</a> <br>
<a>[React TradingView widgets](https://www.npmjs.com/package/react-ts-tradingview-widgets)</a> <br>
<a>[Mui](https://mui.com/)</a> <br>
<!-- <a>[]()</a> <br> -->
 <br>

_**This project consumes data from <a>[The Back-End](https://github.com/OGMorales17/Capstone-2/tree/master/CryptoHub/backend)</a> folder, an API build using the following:**_
<!-- <br>  -->

<a>[Node.js v17](https://nodejs.org/en/)</a> <br>
<a>[Express](https://expressjs.com/)</a> <br>
<a>[Axios](https://axios-http.com/docs/intro)</a> <br>
<a>[body-parser](https://www.npmjs.com/package/body-parser#bodyparserjsonoptions)</a> <br>
<a>[coingecko-wrapper-api](https://www.npmjs.com/package/coingecko-wrapper-api)</a> <br>
<a>[CoinGecko](https://www.coingecko.com/en/api/documentation)</a> <br>
<a>[Cointelegraph](https://cointelegraph.com/rss-feeds)</a> <br>
<a>[RSS Feed](https://rss.com/blog/how-do-rss-feeds-work/)</a> <br>

<br>

There is a lot of things that could be implemented in the backend, for example, there is no middleware and authorization with an expiration time that could allow other to use and test the API without having to clone and run the project locally will be great, the market route has some API call that is not been used, and many others.

The frontend has been left open for reusability, the table component could be fed with different data, for example the backend have some api calls that could be used to feed the table component in a different page, and many other things could be implemented.
