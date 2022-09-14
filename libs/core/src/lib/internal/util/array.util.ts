export function toArray<T>(option?: T | Array<T>): Array<T> {
  if (option) {
    if (option instanceof Array) {
      return option;
    } else {
      return [option];
    }
  } else {
    return [];
  }
}
