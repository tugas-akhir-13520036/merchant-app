const FabricClient = require('./lib/fabric-client');
const MerchantController = require('./controller/merchant');
const MerchantService = require('./service/merchant');

class Init {
    constructor(app) {
        this.app = app;

        this.FabricClient = new FabricClient();

        this.MerchantService = new MerchantService(this.FabricClient);

        this.MerchantController = new MerchantController(this.MerchantService);
    }

    async setupService() {
        await this.FabricClient.init();
    }

    async setupRoutes() {
        await this.setupService();
        this.app.get(
            '/healthcheck',
            (_, res) => {
                res.status(200).send('Merchant Dapps is healthy! ');
            },
        );

        this.app.use('/merchant', this.MerchantController.getRouter());
    }
}

module.exports = Init;
