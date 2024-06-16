const { Router } = require('express');
const handleAsync = require('../util/handle-async');

class PaymentController {
    constructor(paymentService) {
        this.paymentService = paymentService;
        this.router = Router();
        this.initRouter();
    }

    initRouter() {
        this.router.get('/payment-channels', handleAsync(this.fetchPaymentChannels.bind(this)));
        this.router.post('/process-payment', handleAsync(this.processPayment.bind(this)));
    }

    getRouter() {
        return this.router;
    }

    async processPayment(req, res) {
        const { paymentChannelId } = req.body;

        const payment = await this.paymentService.processPayment(paymentChannelId);
        return res.status(200).json(payment);
    }

    async fetchPaymentChannels(req, res) {
        const paymentChannels = await this.paymentService.fetchPaymentChannels();
        return res.status(200).json(paymentChannels);
    }
}

module.exports = PaymentController;
