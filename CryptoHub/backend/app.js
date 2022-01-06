"use strict";

// /** Express app for cryptohub. */

const express = require('express')
const cors = require('cors')

const { NotFoundError } = require("./expressError");

const { authenticateJWT } = require("./middleware/auth");
const authRoutes = require("./routes/auth");
// const cryptoassetsRoutes = require("./routes/cryptoassets");
const usersRoutes = require("./routes/users");
const learnRoutes = require("./routes/learn");
// const toolsRoutes = require("./routes/tools");
const newsRoutes = require("./routes/news");

const morgan = require("morgan");

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan("tiny"));
app.use(authenticateJWT);
app.use(express.urlencoded({ extended: true }))

app.use('/', newsRoutes)
app.use('/news', newsRoutes)
app.use("/users", usersRoutes);
app.use("/auth", authRoutes);
app.use('/learn', learnRoutes)
// app.use('/tools', toolsRoutes)
// app.use('/cryptoassets', cryptoassetsRoutes)


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

