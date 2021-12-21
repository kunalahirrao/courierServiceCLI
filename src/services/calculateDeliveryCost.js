const tasks = require("../tasks");
const Table = require("cli-table3");
const getConsignmentPriceAfterDiscount = require("./calculateConsignmentPriceAfterDiscount");
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
      await tasks.askConsignmentDetails();
    // Converting to Integer
    pkgWeightInKg = parseInt(pkgWeightInKg);
    baseDeliveryCost = parseInt(baseDeliveryCost);
    distanceInKm = parseInt(distanceInKm);
    // Coupon code to Upper case and  Short circuit
    couponCode = couponCode && couponCode.toUpperCase();
    const consignment = await getConsignmentPriceAfterDiscount({
      pkgId,
      pkgWeightInKg,
      distanceInKm,
      couponCode,
      baseDeliveryCost,
    });

    // For Using console.table
    // table.push({
    //   pkgId: consignment.pkgId,
    //   discount: consignment.discount,
    //   originalPrice: consignment.originalPrice,
    // });

    table.push([
      consignment.pkgId,
      consignment.discount,
      consignment.originalPrice,
    ]);
  }
  console.log(chalk.yellow("Delivery cost estimation with offer"));
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
