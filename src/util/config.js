require('dotenv').config();
const { v4: uuidv4 } = require('uuid');

const PORT = process.env.PORT || 3000;
const CLIENT_ID = `merchant_${uuidv4()}`;

const IS_TEST_CHAINCODE = true;

module.exports = {
    PORT,
    CLIENT_ID,
    IS_TEST_CHAINCODE,
};
