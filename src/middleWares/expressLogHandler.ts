
import * as express from 'express';
import logger from '../helpers/logger';
const expressWinston = require('express-winston');

export class ExpressLogHandler{

    public static configure(app:express.Application): express.Application{

        console.log("Configuring ExpressLogHandler..");

        app.use(expressWinston.logger({
            winstonInstance: logger
        }));

        console.log("ExpressLogHandler configured successfully.");
        return app;
    }
}