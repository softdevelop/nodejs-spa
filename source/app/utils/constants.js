const config = require("../../config");

const CODE = {
    GET_OK: 200,
    CREATE_OK: 201,
    DELETE_OK: 204,
    NOT_MODIFIED: 304,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_SERVER_ERROR: 500,
}

module.exports = {
    CODE
};