const router = require('express').Router();
const User = require('../model/User');
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require("bcryptjs"); // hashes passwords
const jwt = require("jsonwebtoken");
const signale = require('signale');
const target = 'home';
const login = require('../public/control');

const pk = process.env.TOKEN_SECRET || "awsedrfuhiiko34serdftgyu-hijokp234567890-=]'/'./}"

router.post("/register", async (req, res) => {

    // Validate User
    const { error } = registerValidation(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    };

    // check for existing user
    const emailExist = await User.findOne({ email: req.body.email });

    if (emailExist) {
        return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });
    try {
        await user.save();
        const token = jwt.sign({ _id: user._id }, pk);
        res.json({ user: user._id, redirect: target, token });
        signale.success("Registration OK!");
        login.isLoggedIn = true;
    } catch (error) {
        signale.error(error.message);
        res.status(400).json(error);
    }

});

router.post('/login', async (req, res) => {
    const { error } = loginValidation(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    // if existing email
    const user = await User.findOne({ email: req.body.email });

    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!user || !validPassword) {
        const msg = 'Username or email is incorrect!';
        signale.error(msg);
        return res.status(400).json({ error: msg });  // email||username provides a harder target for brute force attacks.
    }

    // create and assign a token to Frontend
    const token = jwt.sign({ _id: user._id }, pk);
    res.header('auth-token', token).json({ token, redirect: target });
    console.log(`Your authentication token is: ${token}`);
    console.log(`Your payload data is: ${Buffer.from(token.split('.')[1], 'base64')}`);
    signale.success('Login OK!');
    login.isLoggedIn = true;
});

module.exports = router;
