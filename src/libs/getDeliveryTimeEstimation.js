const tasks = require("../tasks");
const chalk = require("chalk");
const Table = require("cli-table3");
const calculatePackagePriceAfterDiscount = require("./calculatePackagePriceAfterDiscount");
const getPossibleConsignment = require("./getpossibleConsignment");
const getDeliveryTimes = require("./getDeliveryTimes");

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
      pkgWeightInKg: pkgWeightInKg,
      distanceInKm: distanceInKm,
      couponCode,
      originalPrice: package.originalPrice,
      discount: package.discount,
    });
  }
  // Ask questions related to Vehicle
  const { noOfVehicles, maxCarryingCapacity, maxSpeed } =
    await tasks.askVehicleDetails();
  // Calculate package delivery time estimate
  const { possibleConsignment, maxSpeedOfVehicle } =
    await getPossibleConsignment({
      packages: packages,
      maxSpeed: maxSpeed,
      maxCarryingCapacity: maxCarryingCapacity,
      baseDeliveryCost: baseDeliveryCost,
    });
  // Delivery table with optimized shipment delivery
  const deliveryTimes = await getDeliveryTimes(
    possibleConsignment,
    noOfVehicles,
    maxSpeedOfVehicle
  );
  deliveryTimes.forEach((package) => {
    table.push([
      package.pkgId,
      package.discount,
      package.originalPrice,
      package.packageDelTime,
    ]);
  });
  console.log(table.toString());
};

module.exports = getDeliveryTimeEstimation;
