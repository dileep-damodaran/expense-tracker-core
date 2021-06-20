const {  Joi, Segments } = require('celebrate');
export class AccountBindingSchema {
    
    public static login =
        {
            [Segments.BODY]: Joi.object().keys({
                user_name: Joi.string().required(),
                password: Joi.string().required()
            })
        };

    public static token = {
        [Segments.BODY]: Joi.object().keys({
            refresh_token: Joi.string().required()
        })
    };

}