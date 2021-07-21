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
