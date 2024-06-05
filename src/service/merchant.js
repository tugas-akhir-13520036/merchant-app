const logger = require('../util/logger');

class MerchantService {
    constructor(fabricClient) {
        this.fabricClient = fabricClient;
    }

    async fetchAttributes() {
        logger.info('Fetching attributes');
        const res = await this.fabricClient.getAttributes();
        return res;
    }
}

module.exports = MerchantService;
