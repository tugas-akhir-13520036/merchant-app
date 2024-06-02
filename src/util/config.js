require('dotenv').config();

const PORT = process.env.PORT || 3000;
const CLIENT_ID = process.env.CLIENT_ID || 'admin';

const IS_TEST_CHAINCODE = true;

module.exports = {
    PORT,
    CLIENT_ID,
    IS_TEST_CHAINCODE,
};
