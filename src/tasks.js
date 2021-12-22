const inquirer = require("inquirer");

module.exports = {
  askTypeOfTask: () => {
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
            name: "Get Delivery time estimation",
            value: "getDeliveryTimeEstimation",
          },
          {
            name: "List of Coupon codes",
            value: "getAllCouponCodes",
          },
          {
            name: "Add a new discount Coupon",
            value: "addNewCouponCode",
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
        message: "Enter the Base Delivery Cost",
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
        message: "Enter No of Packages",
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
  askPackageDetails: () => {
    const packageQuestions = [
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
            return "Please enter package Weight in Kg";
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
            return "Please enter distance to Destination in Km";
          }
        },
      },
      {
        name: "couponCode",
        type: "input",
        message: "Enter a Coupon code ",
      },
    ];
    return inquirer.prompt(packageQuestions);
  },
  askNewCouponDetails: () => {
    const couponQuestions = [
      {
        type: "input",
        name: "couponCode",
        message: "Enter the code of the coupon",
        validate: (couponCode) => {
          if (couponCode.length) {
            return true;
          } else {
            return "Please Enter the code of the coupon";
          }
        },
      },
      {
        type: "input",
        name: "discount",
        message: "Enter the discount in %",
        validate: (discount) => {
          if (discount.length && typeof parseInt(discount) == "number") {
            return true;
          } else {
            return "Please enter the discount in %";
          }
        },
      },
      {
        type: "input",
        name: "minWeight",
        message: "Enter the minimum weight of the package in Kg",
        validate: (minWeight) => {
          if (minWeight.length && typeof parseInt(minWeight) == "number") {
            return true;
          } else {
            return "Please enter minimum weight of the package in Kg";
          }
        },
      },
      {
        type: "input",
        name: "maxWeight",
        message: "Enter the maximum weight of the package in Kg",
        validate: (maxWeight) => {
          if (maxWeight.length && typeof parseInt(maxWeight) == "number") {
            return true;
          } else {
            return "Please enter maximum weight of the package in Kg";
          }
        },
      },
      {
        type: "input",
        name: "minDistance",
        message:
          "Enter the minimum distance to destination of the package in Km",
        validate: (minDistance) => {
          if (minDistance.length && typeof parseInt(minDistance) == "number") {
            return true;
          } else {
            return "Please enter the minimum distance to destination of the package in Km";
          }
        },
      },
      {
        type: "input",
        name: "maxDistance",
        message:
          "Enter the maximum distance to destination of the package in Km",
        validate: (maxDistance) => {
          if (maxDistance.length && typeof parseInt(maxDistance) == "number") {
            return true;
          } else {
            return "Please enter the maximum distance to destination of the package";
          }
        },
      },
    ];
    return inquirer.prompt(couponQuestions);
  },
  askVehicleDetails: () => {
    const vehicleQuestions = [
      {
        type: "input",
        name: "noOfVehicles",
        message:
          "Enter number of vehicles available for delivering the packages",
        validate: (noOfVehicles) => {
          if (
            noOfVehicles.length &&
            typeof parseInt(noOfVehicles) == "number"
          ) {
            return true;
          } else {
            return "Please enter number of vehicles available for delivering the packages";
          }
        },
      },
      {
        type: "input",
        name: "maxSpeed",
        message: "Please enter maximum speed of vehicle",
        validate: (maxSpeed) => {
          if (maxSpeed.length && typeof parseInt(maxSpeed) == "number") {
            return true;
          } else {
            return "Please enter maximum speed of vehicle";
          }
        },
      },
      {
        type: "input",
        name: "maxCarryingCapacity",
        message: "Enter maximum carrying capacity of vehicle",
        validate: function (maxCarryingCapacity) {
          if (
            maxCarryingCapacity.length &&
            typeof parseInt(maxCarryingCapacity) == "number"
          ) {
            return true;
          } else {
            return "Please enter maximum carrying capacity of vehicle";
          }
        },
      },
    ];
    return inquirer.prompt(vehicleQuestions);
  },
};
