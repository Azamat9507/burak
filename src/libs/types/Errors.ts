export enum HttpCode {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500
}

export enum Message {
    GENERIC_ERROR = "An error occurred. Please try again later.",
    NOT_FOUND = "The requested resource was not found.",
    UNAUTHORIZED = "You are not authorized to access this resource.",
    FORBIDDEN = "Access to this resource is forbidden." ,
    SOMETHING_WENT_WRONG = "Something went wrong. Please contact support.",
    NO_DATA_FOUND = "No data found.",
    CREATED_FAILED = "Failed to create the resource.",
    UPDATE_FAILED = "Failed to update the resource.",
    DELETE_FAILED = "Failed to delete the resource."

}

class Errors extends Error {
    public code : HttpCode;
    public message: Message;

    constructor(statusCode: HttpCode, statusMessage: Message) {
        super();
        this.code= statusCode;
        this.message = statusMessage;
    }
}


export default Errors;