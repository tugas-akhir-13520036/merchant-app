const express = require('express');
const helmet = require('helmet');
const httpContext = require('express-http-context');
const bodyParser = require('body-parser');
const cors = require('cors');
const Init = require('./init');

const setupMiddleware = async (app) => {
    app.disable('x-powered-by');
    app.use(helmet());
    app.use(bodyParser.json({ type: 'application/json' }));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static('public/'));
    app.use(httpContext.middleware);
    app.use(cors());
};

const createApp = async () => {
    const app = express();
    await setupMiddleware(app);

    const init = new Init(app);
    await init.setupRoutes();

    return app;
};

module.exports = createApp;
