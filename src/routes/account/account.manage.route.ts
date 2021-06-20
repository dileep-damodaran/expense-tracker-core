

import * as express from "express";
import asyncMiddleWare from "../../middlewares/asyncMiddleWare";
import { AuthenticationService } from "../../services/authenticationService";
import { UserService } from "../../services/userService";
import { AccountBindingSchema } from "./account.manage.bindModel";
const boom = require("boom");
const { celebrate } = require('celebrate');



export class AccountController {

    public static routes(app: express.Application): any {

        let router = express.Router();

        router.post('/login', celebrate(AccountBindingSchema.login), asyncMiddleWare(async (req: express.Request, res: express.Response, next: express.NextFunction) => {

            const userName = req.body.user_name;
            const password = req.body.password;

            const authResult = await AuthenticationService.authenticate(userName, password);

            if (!authResult.authenticated)
                throw boom.unauthorized(authResult.error);

            authResult.user.password = '';
            const result = { user: authResult.user, refresh_token: authResult.refreshToken, access_token: authResult.accessToken };
            res.status(200).send(result);

        }));

        router.post('/token', celebrate(AccountBindingSchema.token), asyncMiddleWare(async (req: express.Request, res: express.Response, next: express.NextFunction) => {

            const refreshToken = req.body.refresh_token;

            const decoded = AuthenticationService.validateRefreshToken(refreshToken);

            if (!decoded)
                throw boom.unauthorized('');

            const uId = decoded.uid;
            const user = await UserService.getById(uId);

            if (!user)
                throw boom.notFound("User not found.");

            if (user.is_deleted)
                throw boom.notFound("User is deleted.");

            if (!user.is_active)
                throw boom.unauthorized("User is disabled.");

            const permissions = await UserService.getPermissions(user);
            const token = AuthenticationService.generateAccessToken(user, permissions);
            const result = { accessToken: token }

            res.status(200).send(result);
        }));

        return router;

    }
}