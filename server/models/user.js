const mongoose = require('mongoose');

// Transaction Schema
const transactionSchema = new mongoose.Schema({
    blockNumber: {
        type: String,
        required: true,
    },
    timeStamp: {
        type: String,
        required: true,
    },
    hash: {
        type: String,
        required: true,
    },
    nonce: {
        type: String,
        required: true,
    },
    blockHash: {
        type: String,
        required: true,
    },
    transactionIndex: {
        type: String,
        required: true,
    },
    from: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        default: null,
    },
    value: {
        type: String,
        required: true,
    },
    gas: {
        type: String,
        required: true,
    },
    gasPrice: {
        type: String,
        required: true,
    },
    isError: {
        type: String,
        required: true,
    },
    txreceipt_status: {
        type: String,
        required: true,
    },
    input: {
        type: String,
        required: true,
    },
    contractAddress: {
        type: String,
        default: null,
    },
    cumulativeGasUsed: {
        type: String,
        required: true,
    },
    gasUsed: {
        type: String,
        required: true,
    },
    confirmations: {
        type: String,
        required: true,
    },
    methodId: {
        type: String,
        required: true,
    },
    functionName: {
        type: String,
        default: "",
    },
});

// UserTransaction Schema
const userTransactionsSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
        unique: true,
    },
    transactions: [transactionSchema],
}, {
    timestamps: true,
});

//Ethereum Price Schema
const ethPriceSchema = new mongoose.Schema({
    ethereum: {
        inr: { type: Number, required: true }, 
        usd: { type: Number, required: true }, 
    },
    timestamp: { type: Date, default: Date.now } 
});


const UserTransactions = mongoose.model('UserTransactions', userTransactionsSchema);
const Ethereum = mongoose.model('Ethereums', ethPriceSchema); 

module.exports = {
    UserTransactions,
    Ethereum,
};
