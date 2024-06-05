const FabricClient = require('./lib/fabric-client');
const AdminController = require('./controller/merchant');
const AdminService = require('./service/merchant');

class Init {
    constructor(app) {
        this.app = app;

        this.FabricClient = new FabricClient();

        this.AdminService = new AdminService(this.FabricClient);

        this.AdminController = new AdminController(this.AdminService);
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

        this.app.use('/merchant', this.AdminController.getRouter());
    }
}

module.exports = Init;
