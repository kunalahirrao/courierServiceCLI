const tasks = require("../tasks");
const chalk = require("chalk");
const addNewCouponToFile = require("./addNewCouponToFile");
const getAllCouponCodes = require("./getAllCouponCodes");

const addNewCouponCode = async () => {
  const {
    couponCode,
    discount,
    minWeight,
    maxWeight,
    minDistance,
    maxDistance,
  } = await tasks.askNewCouponDetails();

  await addNewCouponToFile({
    couponCode,
    discount,
    minWeight,
    maxWeight,
    minDistance,
    maxDistance,
  });
  getAllCouponCodes();
};

module.exports = addNewCouponCode;
