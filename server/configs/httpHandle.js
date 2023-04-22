module.exports = {
    success: (res, data, message = '') => {
        res.status(200).json({
            status: 200,
            data,
            message
        });
    },
    unauthorized: (res, message = '') => {
        res.status(401).json({
            status: 401,
            message
        });
    },
    forbidden: (res, message = '') => {
        res.status(403).json({
            status: 403,
            message
        });
    },
    fail: (res, message = '') => {
        res.status(400).json({
            status: 400,
            message
        });
    },
    error: (res, message = '') => {
        res.status(500).json({
            status: 500,
            message
        });
    },
};