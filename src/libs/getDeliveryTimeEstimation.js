const tasks = require("../tasks");
const chalk = require("chalk");
const Table = require("cli-table3");
const calculatePackagePriceAfterDiscount = require("./calculatePackagePriceAfterDiscount");

const getDeliveryTimeEstimation = async () => {
  let { baseDeliveryCost, noOfPackages } = await tasks.askBasicDetails();
  const table = new Table({
    head: ["Id", "Discount", "Price", "Delivery Time"],
    colWidths: [10, 20, 20, 20],
    wordWrap: true,
  });
  // Forming package list
  const packages = [];
  for (let id = 1; id <= noOfPackages; id++) {
    let { pkgId, pkgWeightInKg, distanceInKm, couponCode } =
      await tasks.askPackageDetails();
    // Converting to Integer
    pkgWeightInKg = parseInt(pkgWeightInKg);
    baseDeliveryCost = parseInt(baseDeliveryCost);
    distanceInKm = parseInt(distanceInKm);
    // Coupon code to Upper case and  Short circuit
    couponCode = couponCode && couponCode.toUpperCase();
    const package = await calculatePackagePriceAfterDiscount({
      pkgId,
      pkgWeightInKg,
      distanceInKm,
      couponCode,
      baseDeliveryCost,
    });
    packages.push({
      pkgId: package.pkgId,
      weight: pkgWeightInKg,
      distance: distanceInKm,
      couponCode,
    });
  }
  //   console.log(packages);
  // Ask questions related to Vehicle
  const { noOfVehicles, maxCarryingCapacity, maxSpeed } =
    await tasks.askVehicleDetails();
  // Calculate package delivery time estimate
  getDeliveryTimes({    
    packages: packages,
    maxSpeed: maxSpeed,
    maxCarryingCapacity: maxCarryingCapacity,
    noOfVehicles: noOfVehicles,
    baseDeliveryCost: baseDeliveryCost,
  });
  return "Work is in progress";
};

module.exports = getDeliveryTimeEstimation;
