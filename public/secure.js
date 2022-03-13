const jwt = require("jsonwebtoken");


fetch('api/secure', {
    method: 'GET',
    headers: {
        'auth-token': localStorage.getItem('auth-token')
    }
});

// function decodeToken(token){
//     return jwt.decode(token); // decodes jwt signed token using HMAC SHA-256.
// };

// module.exports = decodeToken;