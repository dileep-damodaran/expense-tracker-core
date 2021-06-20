import * as express from "express";
const boom = require('express-boom');
const cors = require("cors");

export class ExpressHandler {

    public static load(app: express.Application): express.Application {

        console.log("Configuring ExpressHandler..");

        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(cors());
        app.use(boom());

        console.log("ExpressHandler configured successfully.");
        return app;
    }
}