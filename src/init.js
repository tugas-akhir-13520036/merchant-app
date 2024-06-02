const FabricClient = require('./lib/fabric-client');
const AdminController = require('./controller/admin');
const AdminService = require('./service/admin');

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
                res.status(200).send('Admin Dapps is healthy! ');
            },
        );

        this.app.use('/admin', this.AdminController.getRouter());
    }
}

module.exports = Init;
