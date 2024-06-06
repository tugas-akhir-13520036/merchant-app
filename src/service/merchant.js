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

    async fetchMerchant() {
        logger.info('Fetching merchant');
        const res = await this.fabricClient.getMerchant();
        return res;
    }

    async proposeAttribute(key, value) {
        logger.info('Proposing attribute');
        const res = await this.fabricClient.proposeAttribute(key, value);
        return res;
    }

    async fetchPendingAttributes() {
        logger.info('Fetching pending attributes');
        const res = await this.fabricClient.getPendingAttributes();
        return res;
    }
}

module.exports = MerchantService;
