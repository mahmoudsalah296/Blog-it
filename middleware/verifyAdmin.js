const jwt = require('jsonwebtoken');

const isAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({message: "Unauthorized"});
    }

    const token = authHeader.split(" ")[1]

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(403).json({message: "Forbidden"})
        }

        req.user = {id: decoded.UserInfo.id, isAdmin: decoded.UserInfo.isAdmin};
        
        if (!decoded.UserInfo.isAdmin) {
            return res.status(401).json({message: "unauthorized"})
        }
        next();
    });
}

module.exports = isAdmin;