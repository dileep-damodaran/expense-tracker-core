import * as express from 'express';
import { AccountController } from '../routes/account/account.manage.route';
import { TransactionController } from '../routes/transaction/transaction.manage.route';


export class RouteHandler {

    public static configure(app: express.Application): express.Application {

        console.log("RouteHandler ExpressLogHandler..");

        app.use("/api/account", AccountController.routes(app));

        app.use("/api/transaction", TransactionController.routes(app));

        console.log("RouteHandler configured successfully.");

        return app;
    }
}