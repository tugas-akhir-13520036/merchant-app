const { Gateway, Wallets } = require('fabric-network');
const FabricCAClient = require('fabric-ca-client');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const CertAuthUtil = require('../util/cert-authority');

const {
    WALLET_PATH, CHANNEL, CHAINCODES, orgConfig,
} = require('./constant');
const logger = require('../../util/logger');

class FabricClient {
    constructor() {
        this.channelName = CHANNEL.DEFAULT;
        this.gateway = new Gateway();
    }

    async init() {
        const ccpPath = path.resolve(__dirname, orgConfig.ccpPath);
        const walletPath = path.join(process.cwd(), WALLET_PATH);

        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
        const caClient = CertAuthUtil.buildCAClient(FabricCAClient, ccp, orgConfig.caHostName);

        this.wallet = await Wallets.newFileSystemWallet(walletPath);

        logger.info('Enrolling Admin');
        await CertAuthUtil.enrollAdmin(caClient, this.wallet, orgConfig.mspId);

        logger.info('Registering and Enrolling User');
        await CertAuthUtil.registerAndEnrollUser(
            caClient,
            this.wallet,
            orgConfig.mspId,
            orgConfig.userId,
            orgConfig.affiliation,
        );

        logger.info('Connecting to Fabric gateway');
        await this.gateway.connect(ccp, {
            wallet: this.wallet,
            identity: orgConfig.userId,
            discovery: { enabled: true, asLocalhost: true },
        });
        this.network = await this.gateway.getNetwork(this.channelName);

        logger.info('Connected to Fabric gateway');

        logger.info('Creating Merchant');
        this.merchantId = orgConfig.userId || `merchant-${uuidv4()}`;
        await this.createMerchant();
        logger.info('Merchant created');
    }

    async getAttributes() {
        const contract = this.network.getContract(CHAINCODES.MERCHANT_ATTR);
        const result = await contract.submitTransaction('getAttributesList');
        return JSON.parse(result.toString());
    }

    async createMerchant() {
        const date = new Date().toISOString();

        const contract = this.network.getContract(CHAINCODES.MERCHANT_ATTR);
        const result = await contract.submitTransaction('createMerchant', 'merchant1', this.merchantId, date);

        return result.toString();
    }

    async getMerchant() {
        const contract = this.network.getContract(CHAINCODES.MERCHANT_ATTR);
        const result = await contract.submitTransaction('fetchOwnMerchantData');
        return JSON.parse(result.toString());
    }

    async proposeAttribute(attrName, attrValue) {
        const uuid = uuidv4();
        const date = new Date().toISOString();

        const contract = this.network.getContract(CHAINCODES.MERCHANT_ATTR);
        const result = await contract.submitTransaction('proposeMerchantAttr', attrName, attrValue, uuid, date);

        return result.toString();
    }

    async getPendingAttributes() {
        const contract = this.network.getContract(CHAINCODES.MERCHANT_ATTR);
        const result = await contract.submitTransaction('fetchPendingOwnMerchantAttr', this.merchantId);
        return JSON.parse(result.toString());
    }

    async fetchHistory() {
        const contract = this.network.getContract(CHAINCODES.MERCHANT_ATTR);
        const result = await contract.evaluateTransaction('queryOwnHistory', this.merchantId);
        return JSON.parse(result.toString());
    }

    async fetchPaymentChannels() {
        const contract = this.network.getContract(CHAINCODES.MERCHANT_ATTR);
        const result = await contract.evaluateTransaction('fetchPaymentChannels');
        return JSON.parse(result.toString());
    }

    async getDecision(paymentChannelId) {
        const contract = this.network.getContract(CHAINCODES.ACCESS_DECISION);
        const result = await contract.evaluateTransaction('getDecision', paymentChannelId);
        return JSON.parse(result.toString());
    }

    async getMspId() {
        const contract = this.network.getContract(CHAINCODES.MERCHANT_ATTR);
        const result = await contract.evaluateTransaction('getMspId');
        return result.toString();
    }

    getChannelInfo() {
        const channelInfo = this.network.getChannel();
        return channelInfo;
    }
}

module.exports = FabricClient;
