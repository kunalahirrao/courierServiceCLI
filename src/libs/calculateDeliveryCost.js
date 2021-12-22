const tasks = require("../tasks");
const Table = require("cli-table3");
const calculatePackagePriceAfterDiscount = require("./calculatePackagePriceAfterDiscount");
const chalk = require("chalk");

const calculateDeliveryCost = async () => {
  let { baseDeliveryCost, noOfPackages } = await tasks.askBasicDetails();
  // For using console.table-- Refer https://rb.gy/dyjoai
  // const table = [];
  const table = new Table({
    head: ["Id", "Discount", "Price"],
    colWidths: [10, 30, 30],
    wordWrap: true,
  });
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

    // For Using console.table
    // table.push({
    //   pkgId: package.pkgId,
    //   discount: package.discount,
    //   originalPrice: package.originalPrice,
    // });

    table.push([package.pkgId, package.discount, package.originalPrice]);
  }
  console.log(chalk.yellow("Delivery cost estimation with coupon"));
  // For console.table
  //   console.table(
  //     table.map((command) => {
  //       return {
  //         "Id": command.pkgId,
  //         "Discount": command.discount,
  //         "Price": command.originalPrice,
  //       };
  //     })
  //   );

  console.log(table.toString());
};

module.exports = calculateDeliveryCost;
