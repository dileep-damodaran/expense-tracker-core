import { ApplicationEnums } from "../../helpers/enum";

const { Joi, Segments } = require('celebrate');
export class TransactionBindingSchema {

    public static createTransaction =
        {
            [Segments.BODY]: Joi.object().keys({
                year: Joi.number().min(2021).required(),
                month: Joi.number().min(1).max(12).required(),
                date: Joi.number().min(1).max(31).required(),
                type: Joi.string().valid(
                    ApplicationEnums.TRANSACTION_MANAGEMENT.TYPE[ApplicationEnums.TRANSACTION_MANAGEMENT.TYPE.EXPENSE],
                    ApplicationEnums.TRANSACTION_MANAGEMENT.TYPE[ApplicationEnums.TRANSACTION_MANAGEMENT.TYPE.INCOME]
                ).required(),
                amount: Joi.number().min(1).required(),
                description: Joi.string().optional(),
                category_id: Joi.string().required(),
                source_id: Joi.string().required(),
                tag_ids: Joi.array().optional()
            })
        };


}