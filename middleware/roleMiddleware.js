const jwt = require('jsonwebtoken');
const { secret } = require('../config');

module.exports = (roles) => {
    return (req, res, next) => {
        if (req.method === 'OPTIONS') {
            next();
        }

        try {
            const token = req.headers.authorization.split(' ')[1];
            if (!token) {
                return res.status(403).json({ message: 'User is not logged in' });
            }

            const { roles: userRoles } = jwt.verify(token, secret);
            let isRole = false;

            userRoles.forEach(item => {
                if (roles.includes(item)) {
                    isRole = true;
                }
            });

            if (!isRole) {
                return res.status(403).json({ message: "You don't have access" });
            }
            next();
        } catch (error) {
            console.log(error);
            return res.status(403).json({ message: 'User is not logged in' });
        }
    }
}