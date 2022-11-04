import { flattenArray } from "../util/list.util";

export abstract class AbstractRegistry<T> {

  private items: { [key: string]: T } = {};

  protected constructor(items?: Array<Array<T>>) {
    const registeredIds = new Set<string>();
    for (const item of flattenArray(items)) {
      this.validate(item);
      this.ids(item).forEach(id => {
        if (registeredIds.has(id)) {
          throw new Error(`Id [${id}] already exist.`);
        }
        registeredIds.add(id);
        this.items[id] = item;
      });
    }
  }

  public hasItem(id: string): boolean {
    return id in this.items;
  }

  public getItem(id: string): T {
    if (id in this.items) {
      return this.items[id];
    } else {
      throw new Error(`No item with id [${id}] found in registry.`);
    }
  }

  abstract validate(item: T): void;

  abstract ids(item: T): string[];


}
