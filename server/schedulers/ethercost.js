const CronJob = require("node-cron");
const {handleEtherCost} = require("../controllers/user");

//Repeat evry 10 minutes

exports.initScheduledJobs = () => {
    const scheduledJobFunction = CronJob.schedule("*/10 * * * *", async() => {
        try {
            await handleEtherCost();
        } catch (error) {
            console.error("Error updating Ethereum cost:", error);
        }
    });

    scheduledJobFunction.start();
};