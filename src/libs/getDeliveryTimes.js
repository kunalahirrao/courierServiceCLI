const arr = [155, 125, 50, 75, 55];
let sortedArr;

function subset(arr) {
  return (sortedArr = arr.sort((a, b) => b - a));
}

subset(arr);

var twoSum = function (sortedArr, target) {
  let arr = sortedArr;
  let result = [];
  for (var i = 0; i < arr.length; i++) {
    for (var j = i + 1; j < arr.length; j++) {
      const sum = arr[i] + arr[j];
      if (sum <= target) {
        result.push({ [sum]: [arr[i], arr[j]] });
        arr = arr.filter((item) => {
          return item !== arr[i] && item !== arr[j];
        });
      } else {
        result.push({
          [sum]: {
            weightOne: arr[i],
            weightTwo: arr[j],
          },
        });
      }
    }
  }
  return result;
};

console.log(twoSum(sortedArr, 200));
