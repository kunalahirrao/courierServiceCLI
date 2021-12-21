const couponCodes = require("../couponCodes.json");

async function calculateConsignmentPriceAfterDiscount({
  pkgId,
  pkgWeightInKg,
  distanceInKm,
  couponCode,
  baseDeliveryCost,
}) {
  // Validation
  let errors = [];
  if (!pkgId) {
    errors.push("Package Id");
  }
  if (!pkgWeightInKg || typeof pkgWeightInKg !== "number") {
    errors.push("Package weight in Kg");
  }
  if (!distanceInKm || typeof distanceInKm !== "number") {
    errors.push("Distance to destination in Km");
  }
  if (errors.length > 0) {
    return `${errors.join()}`;
  } else {
    let originalPrice =
      baseDeliveryCost + pkgWeightInKg * 10 + distanceInKm * 5;
    let discount = 0;
    let isCouponCode =
      couponCode &&
      couponCode.split(",").find((code) => {
        return couponCodes.hasOwnProperty(code.toUpperCase());
      });
    if (!isCouponCode) {
      return {
        originalPrice,
        discount,
        pkgId,
      };
    } else {
      //Calculate Discount Amount
      discount = await getDiscount(
        originalPrice,
        couponCode,
        distanceInKm,
        pkgWeightInKg
      );
      originalPrice = originalPrice - discount;
    }
    return {
      originalPrice,
      discount,
      pkgId,
    };
  }
}

async function getDiscount(
  originalPrice,
  couponCode,
  distanceInKm,
  pkgWeightInKg
) {
  const { min: minWeight, max: maxWeight } =
    couponCodes[couponCode].weightRange;
  const { min: minDistance, max: maxDistance } =
    couponCodes[couponCode].distanceRange;
  const isValidDistance = await isValid(distanceInKm, minDistance, maxDistance);
  const isValidWeight = await isValid(pkgWeightInKg, minWeight, maxWeight);
  if (isValidDistance && isValidWeight) {
    discount = (couponCodes[couponCode].discount / 100) * originalPrice;
    return discount;
  } else {
    return (discount = 0);
  }
}

async function isValid(val, min, max) {
  return val >= min && val <= max;
}

module.exports = calculateConsignmentPriceAfterDiscount;
