const jwt = require('jsonwebtoken');
const config = require('../config');


module.exports = function (req,res,next) {
    const token = req.cookies?.token || (req.header('Authorization')?.replace('Bearer ', ''));
    if(!token) return res.status(401).json({message: "No token, authorization failed"});


    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        req.user = {id: decoded.userId, role: decoded.role };
        next();
    } catch (e) {
        console.error(e);
        res.status(401).json({ message:"Token is not valid" });
    }
};