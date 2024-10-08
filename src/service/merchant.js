const logger = require('../util/logger');

class MerchantService {
    constructor(fabricClient) {
        this.fabricClient = fabricClient;
        this.paymentInfo = '[MOCK] Processing payment...';
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

    async fetchHistory() {
        logger.info('Fetching history');
        const res = await this.fabricClient.fetchHistory();
        return res;
    }
}

module.exports = MerchantService;
