const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(403).json({ message: 'User is not logged in' });
        }

        const decodedData = jwt.verify(token, process.env.SECRET);
        req.user = decodedData;
        next();
    } catch (error) {
        console.log(error);
        return res.status(403).json({ message: 'User is not logged in' });
    }
}