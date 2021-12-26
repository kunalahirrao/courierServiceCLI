const getDeliveryTimes = require("../libs/getDeliveryTimes");

test("Calculated Shipment times", async () => {
  expect(
    await getDeliveryTimes(
      [
        [
          {
            pkgId: "2",
            pkgWeightInKg: 75,
            distanceInKm: 125,
            couponCode: "",
            originalPrice: 1475,
            discount: 0,
            packageDelTime: 1.78,
          },
          {
            pkgId: "4",
            pkgWeightInKg: 110,
            distanceInKm: 60,
            couponCode: "OFR002",
            originalPrice: 1395,
            discount: 105.00000000000001,
            packageDelTime: 0.85,
          },
        ],
        [
          {
            pkgId: "3",
            pkgWeightInKg: 175,
            distanceInKm: 100,
            couponCode: "",
            originalPrice: 2350,
            discount: 0,
            packageDelTime: 1.42,
          },
        ],
        [
          {
            pkgId: "5",
            pkgWeightInKg: 155,
            distanceInKm: 95,
            couponCode: "",
            originalPrice: 2125,
            discount: 0,
            packageDelTime: 4.21,
          },
        ],
        [
          {
            pkgId: "1",
            pkgWeightInKg: 50,
            distanceInKm: 30,
            couponCode: "",
            originalPrice: 750,
            discount: 0,
            packageDelTime: 3.9899999999999998,
          },
        ],
      ],
      2,
      70
    )
  ).toEqual([
    {
      pkgId: "1",
      discount: "0",
      originalPrice: 750,
      packageDelTime: "3.99",
    },
    {
      pkgId: "2",
      discount: "0",
      originalPrice: 1475,
      packageDelTime: "1.78",
    },
    {
      pkgId: "3",
      discount: "0",
      originalPrice: 2350,
      packageDelTime: "1.42",
    },
    {
      pkgId: "4",
      discount: "105",
      originalPrice: 1395,
      packageDelTime: "0.85",
    },
    {
      pkgId: "5",
      discount: "0",
      originalPrice: 2125,
      packageDelTime: "4.20",
    },
  ]);
});
