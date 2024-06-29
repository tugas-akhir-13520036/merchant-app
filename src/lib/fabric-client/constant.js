const { CLIENT_ID } = require('../../util/config');

const CHANNEL = {
    DEFAULT: 'mychannel',
};

const WALLET_PATH = '/tmp/wallet';

const orgConfig = {
    userId: CLIENT_ID,
    mspId: 'Org1MSP',
    peers: ['peer0.org1.example.com'],
    admin: 'admin',
    caHostName: 'ca.org1.example.com',
    affiliation: 'org1.department1',
    ccpPath: '../../../../fabric-network/test-network/organizations/peerOrganizations/org1.example.com/connection-org1.json',
};

const CHAINCODES = {
    MERCHANT_ATTR: 'merchant-attr-asset-transfer',
    ACCESS_DECISION: 'access-decision-asset-transfer',
    CHANNEL_POLICY: 'channel-policy-asset-transfer',
};

module.exports = {
    WALLET_PATH,
    CHANNEL,
    CHAINCODES,
    orgConfig,
};
