const logger = require('../util/logger');

class PaymentService {
    constructor(fabricClient) {
        this.fabricClient = fabricClient;
    }

    async processPayment(paymentChannelId) {
        logger.info('Processing payment');
        const decision = await this.fabricClient.getDecision(paymentChannelId);

        if (decision) {
            return 'Payment successful';
        }

        return 'Payment failed, access denied';
    }

    async fetchPaymentChannels() {
        logger.info('Fetching payment channels');
        const res = await this.fabricClient.fetchPaymentChannels();
        return res;
    }
}

module.exports = PaymentService;
