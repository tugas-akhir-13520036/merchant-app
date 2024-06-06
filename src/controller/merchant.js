const { Router } = require('express');
const handleAsync = require('../util/handle-async');

class MerchantController {
    constructor(merchantService) {
        this.merchantService = merchantService;
        this.router = Router();
        this.initRouter();
    }

    initRouter() {
        this.router.get('/', handleAsync(this.fetchMerchant.bind(this)));
        this.router.get('/attribute', handleAsync(this.getAttributeList.bind(this)));
        this.router.get('/pending-attribute', handleAsync(this.fetchPendingAttributes.bind(this)));
        this.router.post('/propose-attribute', handleAsync(this.proposeAttribute.bind(this)));
    }

    getRouter() {
        return this.router;
    }

    async fetchMerchant(req, res) {
        const merchant = await this.merchantService.fetchMerchant();
        return res.status(200).json(merchant);
    }

    async getAttributeList(req, res) {
        const attributeList = await this.merchantService.fetchAttributes();
        return res.status(200).json(attributeList);
    }

    async proposeAttribute(req, res) {
        const { key, value } = req.body;
        const result = await this.merchantService.proposeAttribute(key, value);
        return res.status(200).json(result);
    }

    async fetchPendingAttributes(req, res) {
        const pendingAttributes = await this.merchantService.fetchPendingAttributes();
        return res.status(200).json(pendingAttributes);
    }
}

module.exports = MerchantController;
