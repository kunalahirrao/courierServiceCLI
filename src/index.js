const chalk = require("chalk");
const figlet = require("figlet");
const tasks = require("./tasks");
const getTotalDeliveryCost = require("./services/calculateDeliveryCost");
const getAllCouponCodes = require("./services/getAllCouponCodes");
const addNewCouponCode = require("./services/addNewCouponCode");

//Header ASCII Art
const headerText = "Courier Service CLI";
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
