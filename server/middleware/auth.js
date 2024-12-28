const jwt = require('jsonwebtoken');
require('dotenv').config();

const ensureAuth = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        
        return res.status(403).json({ message: 'Access denied. No token provided.' });
    }

    const token = authHeader;
    try {
        const verified = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; 
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Invalid token.' });
    }
};

module.exports = { ensureAuth };
