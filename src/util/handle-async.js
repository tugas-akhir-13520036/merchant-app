const { ErrorCodeMap, ErrorCodes } = require('./error/errors');
const StandardError = require('./error/standard-error');
const logger = require('./logger');

function handleAsync(func) {
    return async (req, res, next) => {
        try {
            return await func(req, res, next);
        } catch (err) {
            logger.error(err);

            const code = err.code || ErrorCodes.INTERNAL_SERVER_ERROR;
            const message = err.message || 'Internal server error';
            const errorData = err.data || {};
            const error = new StandardError({ message, code, errorData });

            if (error.code && ErrorCodeMap[error.code]) {
                return res.status(ErrorCodeMap[error.code]).json(error.toJSON());
            }
            return res.status(500).json(error.toJSON());
        }
    };
}

module.exports = handleAsync;
