const logger = require('./util/logger');
const createApp = require('./app');
const { PORT } = require('./util/config');

(async () => {
    try {
        const app = await createApp();
        app.listen(PORT, () => {
            logger.info(`Server listening on port ${PORT}`);
        });
    } catch (err) {
        logger.error(err, 'error caught in server.js');
    }
})();
