export function flattenArray<T>(itemsList?: Array<Array<T>>): Array<T> {
  const flattenedArray: Array<T> = [];
  for (const itemList of itemsList ?? []) {
    for (const item of itemList) {
      flattenedArray.push(item);
    }
  }
  return flattenedArray;
}