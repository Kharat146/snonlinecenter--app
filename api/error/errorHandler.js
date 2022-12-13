const { StatusCodes } = require("http-status-codes");
const logger = require('./../services/logger')

const sendError = (err, res) => {
    err.status = err.status ? err.status : StatusCodes.INTERNAL_SERVER_ERROR;
    err.code = err.code ? err.code : "0000";
    err.reason = err.reason || errorMessages[err.code] ? errorMessages[err.code].reason : "Something went wrong";
    err.message = errorMessages[err.code] ? errorMessages[err.code].message : "Something went wrong";
    logger.error(err.message);

    if (process.env.NODE_ENV === 'production') {
        sendProdError(err, res)
    } else {
        sendDevError(err, res)
    }
}

const sendDevError = (err, res) => {
    res.status(err.status).json({
        status: err.status,
        code: err.code,
        reason: err.reason,
        message: err.message,
        stack: err.stack
    })
}


const sendProdError = (err, res) => {
    if (err.isOperational) {
        res.status(err.status).json({
            status: err.status,
            code: err.code,
            reason: err.reason,
            message: err.message,
        })
    } else {
        log.error("+ ERROR +", err);
        res.status(err.status).json({
            status: err.status,
            message: err.message,
        })
    }

}


module.exports = {
    sendError : sendError
}