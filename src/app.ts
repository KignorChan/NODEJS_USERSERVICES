import express from 'express';
import bodyParser from "body-parser";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../build/swagger.json';
import { RegisterRoutes } from '../build/routes';
import { router } from './router';
import { ValidateError } from 'tsoa';

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var options = {
    explorer: true
};

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
RegisterRoutes(app);
router(app);

app.use(function (err: any, _req: express.Request, res: express.Response, _next: express.NextFunction): express.Response | void {
    if (err instanceof ValidateError) {
        console.warn(`Caught Validation Error for ${_req.path}:`, err.fields);
        return res.status(422).json({
            code: 422,
            message: "Validation Failed",
            details: err?.fields,
        });
    }

    if (err instanceof Error) {
        console.log("error: "+err);
        return res.status(500).json({
            code: 500,
            message: "Internal Server Error",
        });
    }

    _next();
})

export default app;