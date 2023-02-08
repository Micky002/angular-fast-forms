export interface IndexProvider {
  index: number | null;
}

export function isIndexProvider(object: any): object is IndexProvider {
  return 'index' in object;
}
