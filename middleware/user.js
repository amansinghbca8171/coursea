const jwt = require("jsonwebtoken");
const {JWT_USER_PASSWORD } = require("../config");

// if we can use single middleware the the logic can intodues this type

// function middleware(password) {
//     return function(req, res, next) {
//         const token = req.headers.token;
//         const decoded = jwt.verify(token, password);

//         if (decoded) {
//             req.userId = decoded.id;
//             next()
//         } else {
//             res.status(403).json({
//                 message: "You are not signed in"
//             })
//         }    
//     }
// }

function userMiddleware(req, res, next){
    const token = req.headers.token;
    const decoded = jwt.verify(token, JWT_USER_PASSWORD)
    

    if(decoded){
        req.userId = decoded.id;
        next()
    } else {
        res.status(403).json({
            message:"you are not signed in"
        })
    }
}

module.exports = {
    userMiddleware: userMiddleware
}