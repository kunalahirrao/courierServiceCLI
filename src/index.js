const chalk = require("chalk");
const figlet = require("figlet");
const tasks = require("./tasks");
const getTotalDeliveryCost = require("./libs/calculateDeliveryCost");
const getDeliveryTimeEstimation = require("./libs/getDeliveryTimeEstimation");
const getAllCouponCodes = require("./libs/getAllCouponCodes");
const addNewCouponCode = require("./libs/addNewCouponCode");

//Header ASCII Art-- For better aesthetics meaning
const headerText = process.env.headerText;
const asciiArt = figlet.textSync(headerText, {
  horizontalLayout: "full",
  verticalLayout: "default",
});
console.log(chalk.blueBright(asciiArt));

const app = async () => {
  const { typeOfTask } = await tasks.askTypeOfTask();
  switch (typeOfTask) {
    case "getTotalDeliveryCost":
      await getTotalDeliveryCost();
      break;
    case "getDeliveryTimeEstimation":
      await getDeliveryTimeEstimation();
      break;
    case "getAllCouponCodes":
      await getAllCouponCodes();
      break;
    case "addNewCouponCode":
      await addNewCouponCode();
      break;
    case "exit":
      process.exit(0);
    default:
      break;
  }
  //Recursively calling app to present the menu after displaying selected task
  app();
};

app();
