const couponCodes = require("../couponCodes.json");
const baseCostPerKm = process.env.baseCostPerKm || 5;
const baseCostPerKg = process.env.baseCostPerKg || 10;

async function calculatePackagePriceAfterDiscount({
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
    errors.push("weight as no in Kg");
  }
  if (!distanceInKm || typeof distanceInKm !== "number") {
    errors.push("distance to destination as number in Km");
  }

  if (errors.length > 0) {
    return `Please enter valid ${errors.join()}`;
  } else {
    console.log(baseCostPerKm,baseCostPerKg)
    let originalPrice =
      baseDeliveryCost +
      pkgWeightInKg * baseCostPerKg +
      distanceInKm * baseCostPerKm;
    let discount = 0;
    let isCouponCode =
      couponCode &&
      couponCode.split(",").find((code) => {
        return couponCodes.hasOwnProperty(code.toUpperCase());
      });
    if (!isCouponCode) {
      console.log("No coupon code", originalPrice);
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
  const { min: minWeight, max: maxWeight } = couponCodes[couponCode].weight;
  const { min: minDistance, max: maxDistance } =
    couponCodes[couponCode].distance;
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

module.exports = calculatePackagePriceAfterDiscount;
