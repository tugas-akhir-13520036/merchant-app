const { Router } = require('express');
const handleAsync = require('../util/handle-async');

class PaymentController {
    constructor(paymentService) {
        this.paymentService = paymentService;
        this.router = Router();
        this.initRouter();
    }

    initRouter() {
        this.router.get('/eligible-payment-channels', handleAsync(this.fetchEligiblePaymentChannels.bind(this)));
        this.router.post('/process-payment', handleAsync(this.processPayment.bind(this)));
    }

    getRouter() {
        return this.router;
    }

    async processPayment(req, res) {
        const payment = await this.paymentService.processPayment();
        return res.status(200).json(payment);
    }

    async fetchEligiblePaymentChannels(req, res) {
        const paymentChannels = await this.paymentService.fetchEligiblePaymentChannels();
        return res.status(200).json(paymentChannels);
    }
}

module.exports = PaymentController;
