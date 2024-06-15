const logger = require('../util/logger');

class PaymentService {
    constructor(fabricClient) {
        this.fabricClient = fabricClient;
    }

    async processPayment() {
        logger.info('Processing payment');
        const res = await this.fabricClient.processPayment();
        return res;
    }

    async fetchEligiblePaymentChannels() {
        logger.info('Fetching eligible payment channels');
        const res = await this.fabricClient.getEligiblePaymentChannels();
        return res;
    }
}

module.exports = PaymentService;
