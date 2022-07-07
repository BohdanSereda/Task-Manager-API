module.exports = class ApiError extends Error {
    status;
    errors;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static unauthorizedError() {
        return new ApiError(401, "Unauthorized, authorization required ");
    }
    static badRequest(message, errors = []) {
        return new ApiError(400, message, (errors = []));
    }
    static notFound(message, errors = []) {
        return new ApiError(404, message, (errors = []));
    }
};
