

import * as express from "express";
import asyncMiddleWare from "../../middlewares/asyncMiddleWare";
import { Transaction } from "../../model/transaction/transactionDocumentSchema";
import { TransactionService } from "../../services/transactionService";
import { UserService } from "../../services/userService";
import { TransactionBindingSchema } from "./transaction.manage.bindModel";
const boom = require("boom");
const { celebrate } = require('celebrate');
const guard = require("express-jwt-permissions")();



export class TransactionController {

    public static routes(app: express.Application): any {

        let router = express.Router();

        router.post('/', guard.check("transaction.create"), celebrate(TransactionBindingSchema.createTransaction), asyncMiddleWare(async (req, res, next) => {

            const uId = req.user.uid;
            const year = req.body.year;
            const month = req.body.month;
            const date = req.body.date;
            const type = req.body.type;
            const amount = req.body.amount;
            const description = req.body.description;
            const categoryId = req.body.category_id;
            const sourceId = req.body.source_id;
            const tagIds = req.body.tag_ids;

            const user = await UserService.getById(uId);

            if (!user)
                throw boom.notFound('User not found.');

            //TODO : Category Validation

            let transaction = new Transaction();
            transaction.user_id = user.id;
            transaction.year = year;
            transaction.month = month;
            transaction.date = date;
            transaction.type = type;
            transaction.amount = amount;
            transaction.description = description;
            transaction.category_id = categoryId;
            transaction.source_id = sourceId;
            transaction.tag_ids = tagIds;

            const created = await TransactionService.save(transaction);

            res.status(200).send(created);

        }));

        return router;

    }
}