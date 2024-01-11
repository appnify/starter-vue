/**
 * 找出数组中最近的元素
 */
export function getClosestValInSortedArr(sortedArr: number[], target: number) {
  if (sortedArr.length === 0) {
    throw new Error("sortedArr can not be empty");
  }
  if (sortedArr.length === 1) {
    return sortedArr[0];
  }

  let left = 0;
  let right = sortedArr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (sortedArr[mid] === target) {
      return sortedArr[mid];
    } else if (sortedArr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  if (left >= sortedArr.length) {
    return sortedArr[right];
  }
  if (right < 0) {
    return sortedArr[left];
  }

  return Math.abs(sortedArr[right] - target) <= Math.abs(sortedArr[left] - target) ? sortedArr[right] : sortedArr[left];
}
