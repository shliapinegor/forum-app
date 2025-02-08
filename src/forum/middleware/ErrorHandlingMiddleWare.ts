import {Middleware, ExpressErrorMiddlewareInterface, HttpError} from "routing-controllers";
import {Request, Response, NextFunction } from 'express'

@Middleware({ type: "after" })
export class ErrorHandlingMiddleWare implements ExpressErrorMiddlewareInterface {

    error(error: Error, request: Request, response: Response, next: NextFunction) {
        error instanceof HttpError ?
            response.status((error as HttpError).httpCode).json({
                message: error.message,
                timestamp: new Date().toUTCString(),
                status: (error as HttpError).httpCode,
                error: "Not Found",
                path: request.path
            }) :
        response.status(400).json({
            message: error.message,
            timestamp: new Date().toUTCString(),
            status: 400,
            error: "Bad Request",
            path: request.path
        })
    }

}