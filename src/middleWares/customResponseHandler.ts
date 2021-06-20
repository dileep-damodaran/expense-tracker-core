import * as express from 'express';
import { FormattedResponse } from '../helpers/formattedResponse';
const mung = require('express-mung');

export class CustomResponseHandler{

    public static configure(app : express.Application){

        console.log("Configuring CustomResponseHandler..");

        app.use(mung.json((body: any, req: express.Request, res: express.Response)=>{

            const formattedResponse = new FormattedResponse(true,body,'');
            return formattedResponse;
        }));

        console.log("CustomResponseHandler configured successfully.");
        return app;
    }
}