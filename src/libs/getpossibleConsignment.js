// Shipment can have multple packages <= max carrying capacity
//  Shipment with maximum packages should get priority
// If weights are same then preferance to distance to destination i.e, less km
async function getPossibleConsignment(consignmentDetails) {
  const packages = consignmentDetails.packages;
  const maxCarryingCapacityOfVehicle = consignmentDetails.maxCarryingCapacity;
  const noOfPackages = consignmentDetails.noOfPackages;
  const maxSpeedOfVehicle = consignmentDetails.maxSpeed;
  // Packages sorted in Descending order
  let sortedPackagesByWeight = packages.sort((a, b) => {
    return b.pkgWeightInKg - a.pkgWeightInKg;
  });
  // Contains end result
  let possibleConsignment = [];
  // Each time we substract currentPackageWeightInKg from maxCarryingCapacityOfVehicle which results in
  let updatedCarryingCapacityOfVehicle = 0;
  let currentPackageWeightInKg = 0;
  let nextPackageWeightInKg = 0;
  let flag = false;
  let shipment = [];
  // Storing index of packages which are already placed in possibleConsignment
  let index = [];

  for (i = 0; i < sortedPackagesByWeight.length; i++) {
    if (!index.includes(i)) {
      flag = false;
      currentPackageWeightInKg = sortedPackagesByWeight[i].pkgWeightInKg;
      if (currentPackageWeightInKg === maxCarryingCapacityOfVehicle) {
        shipment.push(sortedPackagesByWeight[i]);
        index.push(i);
      } else if (currentPackageWeightInKg < maxCarryingCapacityOfVehicle) {
        updatedCarryingCapacityOfVehicle =
          maxCarryingCapacityOfVehicle - currentPackageWeightInKg;
        shipment.push(sortedPackagesByWeight[i]);
        index.push(i);
        for (
          j = i + 1;
          j < sortedPackagesByWeight.length && flag === false;
          j++
        ) {
          if (!index.includes(j)) {
            nextPackageWeightInKg = sortedPackagesByWeight[j].pkgWeightInKg;
            if (
              updatedCarryingCapacityOfVehicle - nextPackageWeightInKg ===
              0
            ) {
              shipment.push(sortedPackagesByWeight[j]);
              index.push(j);
              // To come out of loop and to take next weight in line
              flag = true;
            } else if (
              updatedCarryingCapacityOfVehicle - nextPackageWeightInKg >
              0
            ) {
              updatedCarryingCapacityOfVehicle =
                updatedCarryingCapacityOfVehicle - nextPackageWeightInKg;
              shipment.push(sortedPackagesByWeight[j]);
              index.push(j);
            }
          }
        }
        flag = false;
      }
      possibleConsignment.push(shipment);
      shipment = [];
    }
  }
  return { possibleConsignment, maxSpeedOfVehicle };
}

module.exports = getPossibleConsignment;
