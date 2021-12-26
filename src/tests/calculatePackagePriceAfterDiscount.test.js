const calculatePackagePriceAfterDiscount = require("../libs/calculatePackagePriceAfterDiscount");

// Invalid package Id
test("Invalid package Id", async () => {
  expect(
    await calculatePackagePriceAfterDiscount({
      pkgWeightInKg: 20,
      distanceInKm: 20,
      couponCode: "OFR001",
      baseDeliveryCost: 100,
    })
  ).toBe("Please enter valid Package Id");
});

//Invalid package weight
test("Invalid package weight --- Not a number", async () => {
  expect(
    await calculatePackagePriceAfterDiscount({
      pkgId: 1,
      pkgWeightInKg: "anything",
      distanceInKm: 20,
      couponCode: "OFR001",
      baseDeliveryCost: 100,
    })
  ).toBe("Please enter valid weight as no in Kg");
});

// Invalid distance to destination
test("Invalid distance in Km --- Not a number", async () => {
  expect(
    await calculatePackagePriceAfterDiscount({
      pkgId: 1,
      pkgWeightInKg: 5,
      distanceInKm: "anything",
      couponCode: "OFR001",
      baseDeliveryCost: 100,
    })
  ).toBe("Please enter valid distance to destination as number in Km");
});

// No Coupon code
test("No Coupon Code", async () => {
  expect(
    await calculatePackagePriceAfterDiscount({
      pkgId: "1",
      pkgWeightInKg: 5,
      distanceInKm: 5,
      baseDeliveryCost: 100,
    })
  ).toEqual({ originalPrice: 175, discount: 0, pkgId: "1" });
});

//Valid coupon code
test("Valid Coupon Code", async () => {
  expect(
    await calculatePackagePriceAfterDiscount({
      pkgId: "1",
      pkgWeightInKg: 120,
      distanceInKm: 120,
      couponCode: "OFR002",
      baseDeliveryCost: 100,
    })
  ).toEqual({ originalPrice: 1767, discount: 133, pkgId: "1" });
});
