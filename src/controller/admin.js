const { Router } = require('express');
const handleAsync = require('../util/handle-async');

class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
        this.router = Router();
        this.initRouter();
    }

    initRouter() {
        this.router.get('/attributes', handleAsync(this.getAttributeList.bind(this)));
    }

    getRouter() {
        return this.router;
    }

    async getAttributeList(req, res) {
        const attributeList = await this.adminService.fetchAttributes();
        return res.status(200).json(attributeList);
    }
}

module.exports = AdminController;
