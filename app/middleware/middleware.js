const jwt = require('jsonwebtoken');

const ResponseHandler = {
    success: (res, message, code, data = {}) => {
        res.status(200).send({
            message: message,
            data: data,
            code: code,
        });
    },
    error: (res, error) => {
        console.log(`error:- `, error);
        res.status(500).send({
            message: error.message,
            code: 500
        })
    }
}

const verifyToken = () => {
    return (req, res, next) => {
        try {
            const { authorization } = req.headers;
            if (!req.headers || !authorization) {
                throw { error: 'Invalid token', code: 500 };
            }
            if (!authorization.includes('Bearer')) {
                throw { error: 'Wrong format', code: 500 };
            }
            const decoded = jwt.verify(authorization.split(" ")[1], process.env.JWT_KEY);
            if (!decoded) {
                throw { error: 'Unauthorized user', code: 500 }
            }
            req.body.loggedinUser = decoded;
            next();
        } catch (error) {
            return ResponseHandler.error(res, error);
        }
    }
}

module.exports = { ResponseHandler, verifyToken }