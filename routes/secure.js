const router = require('express').Router();
const verify = require('./verifyToken');
router.get('/access-gateway', verify, (_, res) => {
    res.redirect('/home');
})

module.exports = router;