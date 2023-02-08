export interface IndexProvider {
  index: number | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isIndexProvider(object: any): object is IndexProvider {
  return 'index' in object;
}
