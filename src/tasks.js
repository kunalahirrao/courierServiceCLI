const inquirer = require("inquirer");

module.exports = {
  askTypeOfTask: async () => {
    const tasks = [
      {
        type: "list",
        name: "typeOfTask",
        message: "Select a Task To Do",
        choices: [
          {
            name: "Calculate total delivery cost",
            value: "getTotalDeliveryCost",
          },          
          {
            name: "Exit",
            value: "exit",
          },
        ],
        default: "getTotalDeliveryCost",
      },
    ];
    return inquirer.prompt(tasks);
  },
  askBasicDetails: () => {
    const basicDetails = [
      {
        type: "input",
        name: "baseDeliveryCost",
        message: "Please Enter the Base Delivery Cost",
        validate: (baseCost) => {
          if (baseCost.length && typeof parseInt(baseCost) == "number") {
            return true;
          } else {
            return "Please Enter the Base Delivery Cost";
          }
        },
      },
      {
        type: "input",
        name: "noOfPackages",
        message: "Please Enter No of Packages",
        validate: (noOfPackages) => {
          if (
            noOfPackages.length &&
            typeof parseInt(noOfPackages) == "number"
          ) {
            return true;
          } else {
            return "Please Enter No of Packages";
          }
        },
      },
    ];
    return inquirer.prompt(basicDetails);
  },
  askConsignmentDetails: () => {
    const consignmentQuestions = [
      {
        name: "pkgId",
        type: "input",
        message: "Enter package Id",
        validate: (packageId) => {
          if (packageId.length) {
            return true;
          } else {
            return "Please enter valid package Id";
          }
        },
      },
      {
        name: "pkgWeightInKg",
        type: "input",
        message: "Enter package Weight in Kg",
        validate: (pkgWeight) => {
          if (pkgWeight.length && typeof parseInt(pkgWeight) == "number") {
            return true;
          } else {
            return "Please enter valid package Weight in Kg";
          }
        },
      },
      {
        name: "distanceInKm",
        type: "input",
        message: "Enter distance to Destination in Km",
        validate: (distance) => {
          if (distance.length && typeof parseInt(distance) == "number") {
            return true;
          } else {
            return "Please enter valid distance in Km";
          }
        },
      },
      {
        name: "couponCode",
        type: "input",
        message: "Enter a Coupon code ",
      },
    ];
    return inquirer.prompt(consignmentQuestions);
  },
};
