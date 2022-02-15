"use strict";

const express = require('express')
const cors = require('cors')

const { NotFoundError } = require("./expressError");

const newsRoutes = require("./routes/news");
const educationRoutes = require("./routes/education");
const marketRoutes = require("./routes/market");
// const toolsRoutes = require("./routes/tools");

const morgan = require("morgan");
const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true }))

app.use('/news', newsRoutes)
app.use('/education', educationRoutes)
app.use('/market', marketRoutes)
// app.use('/tools', toolsRoutes)


/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
    return next(new NotFoundError());
});


/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
    if (process.env.NODE_ENV !== "test") console.error(err.stack);
    const status = err.status || 500;
    const message = err.message;

    return res.status(status).json({
        error: { message, status },
    });
});

module.exports = app


