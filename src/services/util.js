/**
 *
 * @param {Array} firstArray
 * @param {Array} secondArray
 * @returns {Array} elements in firstArray & not in secondArray
 */

export const diffDeviceLists = (firstArray, secondArray) => {
  const compare = (otherArray) => (current) =>
    otherArray.filter((other) => other.id === current.id).length === 0;

  return firstArray.filter(compare(secondArray));
};

export const msToTime = (duration) => {
  const seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  let time = `${seconds}s`;
  if (hours) {
    time = `${hours}h ${minutes}m ` + time;
  } else if (minutes) {
    time = `${minutes}m ` + time;
  }
  return time;
};
