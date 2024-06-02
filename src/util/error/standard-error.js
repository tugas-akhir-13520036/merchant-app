class StandardError extends Error {
    constructor({ message, code, data }) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
        this.code = code || 'INTERNAL_SERVER_ERROR';
        this.data = data || {};
    }

    toJSON() {
        return {
            error: {
                message: this.message,
                code: this.code,
                data: this.data,
            },
        };
    }
}

module.exports = StandardError;
