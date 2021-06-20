import * as express from 'express';
const JWT = require('express-jwt');
const ALGORITHM = 'HS256';


export class AuthenticationHandler{

    public static configure(app: express.Application, secretKey: string): express.Application {

        app.use(JWT({
            secret: secretKey, 
            algorithms: [ALGORITHM]
        }).
        unless({
            path:[
                new RegExp("/api/account/login", "i"),
                new RegExp("/api/account/token", "i"),
            ]
        }));

        return app;
    }
}