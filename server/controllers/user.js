const {UserTransactions, Ethereum}= require("../models/user");
const axios = require("axios");
/**
 * 
 * @param {String} address
 * @return {Promise<Object>}  
 */
async function fetchTransactions(address) {
    const apiKey = process.env.ETHERSCAN_API_KEY; 
    const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&sort=desc&apikey=${apiKey}`;
    
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching transactions:', error);
        throw new Error('Error fetching transactions');
    }
}

/**
 * @param {String} currency 
 */
async function getEtherCost(currency) {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=${currency}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching EtherCost:', error);
        throw new Error('Error fetching EtherCost');
    }
}


async function getTransactions(req, res) {
    const address = req.params.address;
    
    try {
        const result = await fetchTransactions(address);
        if (result.status === '1' && result.result.length > 0) {
            await UserTransactions.findOneAndUpdate(
                { address },
                { transactions: result.result },
                { upsert: true, new: true }
            );
            const etherData = await Ethereum.findOne();

            if (etherData) {
                const response = {
                    ethereum: {
                        inr: etherData.ethereum.inr,
                        usd: etherData.ethereum.usd
                    },
                    transactions: result.result
                };
                res.json(response);
            } else {
                await handleEtherCost();
                const ether = await Ethereum.findOne();
                
                const response = {
                    ethereum: {
                        inr: ether.ethereum.inr,
                        usd: ether.ethereum.usd
                    },
                    transactions: result.result
                };
                res.json(response);
            }
        } else {
            res.status(404).json({ message: 'No transactions found for this address' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

/**
 * 
 * @param {Object[]} transactions 
 * @return {number}
 */
function getExpenses(transactions) {
    let cost = 0;
    let den = 1000000000000000000;
    for (let transaction of transactions) {
        cost += (Number(transaction.gasUsed) * Number(transaction.gasPrice) / den);
    }
    return cost.toString();
}
async function handleExpenses(req, res) {
    const address = req.params.address;
    
    try {
        const result = await fetchTransactions(address);
        if (result.status === '1' && result.result.length > 0) {
            await UserTransactions.findOneAndUpdate(
                { address },
                { transactions: result.result },
                { upsert: true, new: true }
            );
            const etherData = await Ethereum.findOne();
            const TotalExpense = getExpenses(result.result);
            if (etherData) {
                const response = {
                    ethereum: {
                        inr: etherData.ethereum.inr,
                        usd: etherData.ethereum.usd
                    },
                    tansaction_expenses: TotalExpense
                };
                res.json(response);
            } else {
                await handleEtherCost();
                const ether = await Ethereum.findOne();
                
                const response = {
                    ethereum: {
                        inr: ether.ethereum.inr,
                        usd: ether.ethereum.usd
                    },
                    tansaction_expenses: TotalExpense
                };
                res.json(response);
            }
        } else {
            res.status(404).json({ message: 'No transactions found for this address' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function handleHome(req, res) {
    res.json({"message" : "Please Enter address to fetch Transactions"});
}
async function handleEtherCost() {
    try {
        const cost = await getEtherCost("inr,usd");
        const INR = cost.ethereum.inr;
        const USD = cost.ethereum.usd;
        if(INR && USD) {
            await Ethereum.findOneAndUpdate(
                {}, 
                { ethereum: { inr: INR, usd: USD } }, 
                { upsert: true, new: true }
            );
            console.log("Updated Ethereum Cost!");
        }
    } catch (error) {
        console.log("Error: ", error);
    }

}

module.exports = {
    getTransactions,
    handleHome,
    handleEtherCost,
    handleExpenses,
}