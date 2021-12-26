// Shipment with maximum packages should get priority.
// If weights are same then preferance to distance to destination i.e, less km

async function getDeliveryTimes(
  possibleConsignment,
  noOfVehicles,
  maxSpeedOfVehicle
) {
  // Shipment with maximum packages should get priority.
  const shipmentWithMaximumPackages = possibleConsignment.sort((a, b) => {
    return b.length - a.length;
  });
  // Sorting internal array based on distance
  const shipmentByDistance = shipmentWithMaximumPackages.sort((a, b) => {
    a.sort((c, d) => {
      return d.distanceInKm - c.distanceInKm;
    });
    b.sort((c, d) => {
      return d.distanceInKm - c.distanceInKm;
    });
    return 0;
  });
  // If weights are same then preferance to distance to destination i.e, less km
  const finalConsignment = shipmentByDistance.sort((a, b) => {
    const weightA = a.reduce((c, d) => {
      return c + d.pkgWeightInKg;
    }, 0);
    const weightB = b.reduce((c, d) => {
      return c + d.pkgWeightInKg;
    }, 0);
    if (weightB === weightA) {
      return -1;
    } else {
      return 0;
    }
  });

  let allShipments = [];
  let shipment = {
    packages: [],
    packagesDurations: {},
  };

  // Take each shipment and add packageDelivery time to each shipment
  // and add maximum return time to the shipment so that we can use that return time for Vehicle assigment
  for (j = 1; j <= finalConsignment.length; j++) {
    let maxdistance = 0;
    let element = finalConsignment[j - 1];
    for (i = 1; i <= element.length; i++) {
      let package = element[i - 1];
      if (maxdistance < package.distanceInKm) {
        maxdistance = package.distanceInKm;
      }
      shipment.packages.push(package);
      let value = package.distanceInKm / maxSpeedOfVehicle;
      package.packageDelTime = Math.trunc(value * 100) / 100;
    }
    shipment["maxDelTime"] = parseFloat(
      (maxdistance / maxSpeedOfVehicle).toFixed(2)
    );
    const half = maxSpeedOfVehicle / 2;
    // The maximum return time means the package which has highest distance to destination
    shipment["maxReturnTime"] = parseFloat(
      ((maxdistance / maxSpeedOfVehicle) * 2).toFixed(2)
    );
    //  = parseFloat((maxdistance / half).toFixed(2));
    shipment["shipmentId"] = j;
    allShipments.push(shipment);
    shipment = {
      packages: [],
    };
  }
  let vehicleobj = {};
  for (i = 0; i < allShipments.length; i++) {
    for (k = 1; (k = noOfVehicles && i < allShipments.length); k++) {
      let shipment = allShipments[i];
      if (Object.keys(vehicleobj).length < noOfVehicles) {
        const shipmentId = shipment.shipmentId;
        // After max return time the vehicle returns and it becomes available for next shipment and we stored the same time in vehicleObj
        vehicleobj[shipmentId] = shipment.maxReturnTime;
      } else {
        // Array destructuring : Taking vehicle with minimum return time So when it comes we can assign it new package to deliver
        let [vehicleWithLowestReturnTime] = Object.entries(vehicleobj).sort(
          // Array destructuring -- Object.entries gives result in the form of [key(Vehicle no),value(return time)]
          // Here we selected only the return time and compared it and returned vehicle with lowest return time so that we can assign it new package to deliver
          ([, vehicleOneReturnTime], [, vehicleTwoReturnTime]) =>
            vehicleOneReturnTime - vehicleTwoReturnTime
        );
        shipment.packages.forEach((package) => {
          package.packageDelTime =
            package.packageDelTime + vehicleWithLowestReturnTime[1];
        });
        vehicleobj[vehicleWithLowestReturnTime[0]] =
          vehicleWithLowestReturnTime[1] + shipment.maxReturnTime;
      }
      i++;
    }
    i--;
  }
  return allShipments;
}

module.exports = getDeliveryTimes;
