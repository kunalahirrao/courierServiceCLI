const fs = require("fs");
const couponCodes = require("../couponCodes.json");

function addNewCouponToFile({
  couponCode,
  discount,
  minWeight,
  maxWeight,
  minDistance,
  maxDistance,
}) {
  discount = parseInt(discount);
  minWeight = parseInt(minWeight);
  maxWeight = parseInt(maxWeight);
  minDistance = parseInt(minDistance);
  maxDistance = parseInt(maxDistance);
  let errors = [];
  for (let key in arguments[0]) {
    if (!key) {
      errors.push(key);
    }
  }
  if (errors.length > 0) {
    return `Please enter valid ${errors.join()}`;
  } else {
    couponCodes[couponCode.toUpperCase()] = {
      discount,
      distance: {
        min: minDistance,
        max: maxDistance,
      },
      weight: {
        min: minWeight,
        max: maxWeight,
      },
    };
    fs.writeFile("src/couponCodes.json", JSON.stringify(couponCodes), (err) => {
      if (err) throw err;
    });
    console.log("Coupon code added successfully");
    return;
  }
}

module.exports = addNewCouponToFile;
