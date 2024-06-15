const FabricClient = require('./lib/fabric-client');

const MerchantController = require('./controller/merchant');
const PaymentController = require('./controller/payment');

const MerchantService = require('./service/merchant');
const PaymentService = require('./service/payment');

class Init {
    constructor(app) {
        this.app = app;

        this.FabricClient = new FabricClient();

        this.MerchantService = new MerchantService(this.FabricClient);
        this.PaymentService = new PaymentService(this.FabricClient);

        this.MerchantController = new MerchantController(this.MerchantService);
        this.PaymentController = new PaymentController(this.PaymentService);
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
        this.app.use('/payment', this.PaymentController.getRouter());
    }
}

module.exports = Init;
