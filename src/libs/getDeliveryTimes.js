var obj = {};
const consignmentDetails = {
  packages: [
    {
      pkgId: 1,
      pkgWeightInKg: 50,
      distanceInKm: 30,
      baseDeliveryCost: 100,
    },
    {
      pkgId: 2,
      pkgWeightInKg: 75,
      distanceInKm: 125,
      baseDeliveryCost: 100,
    },
    {
      pkgId: 3,
      pkgWeightInKg: 175,
      distanceInKm: 100,
      baseDeliveryCost: 100,
    },
    {
      pkgId: 4,
      pkgWeightInKg: 110,
      distanceInKm: 60,
      baseDeliveryCost: 100,
    },
    {
      pkgId: 5,
      pkgWeightInKg: 155,
      distanceInKm: 95,
      baseDeliveryCost: 100,
    },
  ],
  maxSpeed: 70,
  maxCarryingCapacity: 200,
  noOfVehicles: 2,
  baseDeliveryCost: 100,
  noOfPackages: 5,
};

// Shipment can have multple packages <= max carrying capacity
//  Shipment with maximum packages should get priority
// If weights are same then preferance to distance to destination i.e, less km

async function getDeliveryTimes(consignmentDetails) {
  const packages = consignmentDetails.packages;
  const maxCarryingCapacityOfVehicle = consignmentDetails.maxCarryingCapacity;
  const noOfVehicles = consignmentDetails.noOfVehicles;
  const noOfPackages = consignmentDetails.noOfPackages;

  // Packages sorted in Aescending order
  const sortedPackagesByWeight = packages.sort((a, b) => {
    return b.pkgWeightInKg - a.pkgWeightInKg;
  });
  // Contains end result
  let possibleConsignment = [];

  for (let package of sortedPackagesByWeight) {
    await checkInPossibleConsignment(package);
  }

  function singlePackagePush(package) {
    possibleConsignment.push([package]);
  }

  async function checkInPossibleConsignment(package) {
    if (possibleConsignment.length === 0) {
      possibleConsignment.push([package]);
      return;
    } else {
      let maxSum;
      let maxShipmentPair;
      for (let shipment of possibleConsignment) {
        const shipmentWeightTotal = shipment.reduce((a, c) => {
          return a + c.pkgWeightInKg;
        }, 0);
        const expectedPackageWeight = package.pkgWeightInKg;
        const sum = shipmentWeightTotal + expectedPackageWeight;
        if (sum <= 200) {
          shipment.push(package);
        } else {
          singlePackagePush(package);
          break;
        }
      }
    }
  }

  console.log(possibleConsignment);
}

getDeliveryTimes(consignmentDetails);
