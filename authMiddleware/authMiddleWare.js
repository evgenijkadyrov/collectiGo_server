const jwt = require("jsonwebtoken")
module.exports = function (req, res, next) {
    if (req.method === 'OPTIONS') {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(403).json({message: "User not authorization"})
        }
        const decodedToken = jwt.verify(token, process.env.SECRET);
        req.user = { id: decodedToken.id, email: decodedToken.email };

        next()
    } catch (error) {
        console.log(error)
        return res.status(403).json({message: "User not authorization"})
    }
}
