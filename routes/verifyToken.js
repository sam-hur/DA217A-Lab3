const signale = require("signale");

const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // verifies token
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json('Access Denied');
    }

    try {
        console.log(token);
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        signale.error(error.message);
        res.status(400).json('Invalid Token!');
    }
};