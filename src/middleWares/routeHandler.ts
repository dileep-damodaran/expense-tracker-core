import * as express from 'express';
import { AccountController } from '../routes/account/account.manage.route';


export class RouteHandler{

    public static configure(app:express.Application):express.Application{

        console.log("RouteHandler ExpressLogHandler..");

        app.use("/api/account", AccountController.routes(app));
        
        console.log("RouteHandler configured successfully.");

        return app;
    }
}