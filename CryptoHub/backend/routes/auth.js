"use strict";

/** Routes for authentication. */

const jsonschema = require("jsonschema");

const User = require("../models/user");
const express = require("express");
const router = new express.Router();
const { createToken } = require("../helpers/tokens");
const userAuthSchema = require("../schemas/userAuth.json");
const userRegisterSchema = require("../schemas/userRegister.json");
const { BadRequestError } = require("../expressError");

/** POST /auth/token:  { username, password } => { token }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none
 * 
 */

router.post("/token", async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, userAuthSchema);
        // throw new Error('error')
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const { username, password } = req.body;
        const user = await User.authenticate(username, password);
        const token = createToken(user);
        return res.json({ token });
    } catch (err) {
        return next(err);
    }
});


/** POST /auth/register:   { user } => { token }
 *
 * user must include { username, password, firstName, lastName, email }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none
 */

router.post("/register", async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, userRegisterSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const newUser = await User.register({ ...req.body, isAdmin: false });
        const token = createToken(newUser);
        return res.status(201).json({ token });
    } catch (err) {
        return next(err);
    }
});


module.exports = router;


// "use strict";

// /** Convenience middleware to handle common auth cases in routes. */

// const jwt = require("jsonwebtoken");
// const { SECRET_KEY } = require("../config");
// const { UnauthorizedError } = require("../expressError");


// /** Middleware: Authenticate user.
//  *
//  * If a token was provided, verify it, and, if valid, store the token payload
//  * on res.locals (this will include the username and isAdmin field.)
//  *
//  * It's not an error if no token was provided or if the token is not valid.
//  */

// function authenticateJWT(req, res, next) {
//     try {
//         const authHeader = req.headers && req.headers.authorization;
//         if (authHeader) {
//             const token = authHeader.replace(/^[Bb]earer /, "").trim();
//             res.locals.user = jwt.verify(token, SECRET_KEY);
//         }
//         return next();
//     } catch (err) {
//         return next();
//     }
// }

// /** Middleware to use when they must be logged in.
//  *
//  * If not, raises Unauthorized.
//  */

// function ensureLoggedIn(req, res, next) {
//     try {
//         if (!res.locals.user) throw new UnauthorizedError();
//         return next();
//     } catch (err) {
//         return next(err);
//     }
// }


// /** Middleware to use when they be logged in as an admin user.
//  *
//  *  If not, raises Unauthorized.
//  */

// function ensureAdmin(req, res, next) {
//     try {
//         if (!res.locals.user || !res.locals.user.isAdmin) {
//             throw new UnauthorizedError();
//         }
//         return next();
//     } catch (err) {
//         return next(err);
//     }
// }

// /** Middleware to use when they must provide a valid token & be user matching
//  *  username provided as route param.
//  *
//  *  If not, raises Unauthorized.
//  */

// function ensureCorrectUserOrAdmin(req, res, next) {
//     try {
//         const user = res.locals.user;
//         if (!(user && (user.isAdmin || user.username === req.params.username))) {
//             throw new UnauthorizedError();
//         }
//         return next();
//     } catch (err) {
//         return next(err);
//     }
// }


// module.exports = {
//     authenticateJWT,
//     ensureLoggedIn,
//     ensureAdmin,
//     ensureCorrectUserOrAdmin,
// };