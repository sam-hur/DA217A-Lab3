const router = require('express').Router();
const path = require('path') // read and send html page/
const signale = require('signale');
const login = require('../public/control');

router.get('/', (_, res) => {
    res.redirect('/access-portal');

});

router.get('/access-portal', (_, res) => {
    if (login.isLoggedIn) {
        signale.success('Logout OK!');
        signale.info('Returned to unsecure page');
    }
    login.isLoggedIn = false;
    res.sendFile(path.resolve('public/access_portal.html'));
});

router.get('/home', (_, res) => {
    // if not logged in, go to login page
    if (!login.isLoggedIn) {
        signale.error('403 Access Denied');
        return res.redirect('/access-portal');
    }
    res.sendFile(path.resolve('public/home.html'));
    signale.info('Directed to secure page');
});

module.exports = router;