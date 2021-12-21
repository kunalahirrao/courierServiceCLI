const couponCodes = require("../couponCodes.json");
const chalk = require("chalk");
const Table = require("cli-table3");

const table = new Table({
  head: [
    "Coupon Id",
    "Discount",
    "Minimum Weight",
    "Maximum Weight",
    "Minimum Distance",
    "Maximum Distance",
  ],
  colWidths: [10, 20, 20, 20, 20, 20],
  wordWrap: true,
});

function getAllCouponCodes() {
  console.log(chalk.yellow("Existing Coupon codes"));
  for (let key in couponCodes) {
    const couponDetails = couponCodes[key];
    table.push([
      key,
      couponDetails.discount,
      couponDetails.distance.min,
      couponDetails.distance.max,
      couponDetails.weight.min,
      couponDetails.weight.max,
    ]);
  }
  console.log(table.toString());
}

module.exports = getAllCouponCodes;
