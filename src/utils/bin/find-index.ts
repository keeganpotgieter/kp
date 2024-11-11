export const findIndexStartsWithAlphabetical = (
  arr: string[],
  target: string,
): number => {
  for (let i = 0; i < arr.length; i++) {
    const el = arr[i];
    if (!el) continue;
    if (el.startsWith(target)) {
      return i;
    }
    if (el.localeCompare(target) > 0) {
      break; // Since it's alphabetical, we can stop searching
    }
  }
  return -1; // Not found
};
