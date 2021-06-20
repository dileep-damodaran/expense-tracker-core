import * as express from 'express';
import { isCelebrateError } from 'celebrate';
import { FormattedResponse } from '../helpers/formattedResponse';

export class ExceptionHandler {

    public static configure(app: express.Application) {

        console.log("Configuring ExceptionHandler..");

        app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {

            if (err.isBoom) {

                const error = err.output.payload
                    && err.output.payload.message
                    ? err.output.payload.message : "Something went wrong.";
                const formattedResponse = new FormattedResponse(false, null, error);

                return res.status(err.output.statusCode).json(formattedResponse);
            }

            if (isCelebrateError(err)) {

                const celebrateError = err.details;
                const detailedError = celebrateError ?
                    (celebrateError.get("body") ||
                        celebrateError.get("query") ||
                        celebrateError.get("params")) : null;

                console.log(JSON.stringify(detailedError));

                const error = detailedError
                    && detailedError.details
                    && detailedError.details[0]
                    && detailedError.details[0].message
                    ? detailedError.details[0].message : "Something went wrong.";
                const formattedResponse = new FormattedResponse(false, null, error);

                return res.status(404).json(formattedResponse);
            }

            if (err.code === 'permission_denied') {

                const formattedResponse = new FormattedResponse(false, null, "Insufficient Permissions.");
                return res.status(401).send(formattedResponse);
            }

            else {

                const formattedResponse = new FormattedResponse(false, null, err.message);
                return res.status(err.status
                    || 500).send(formattedResponse);
            }
        });

        console.log("Exception handler configured successfully.");
        return app;
    }
}