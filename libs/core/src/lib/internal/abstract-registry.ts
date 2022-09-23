export abstract class AbstractRegistry<T> {

  private items: { [key: string]: T } = {};

  protected constructor(items?: Array<Array<T>>) {
    for (const item of this.flattenItems(items)) {
      this.validate(item);
      this.ids(item).forEach(id => this.items[id] = item);
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

  private flattenItems(itemsList?: Array<Array<T>>): Array<T> {
    const flattenedList: Array<T> = [];
    for (const itemList of itemsList ?? []) {
      for (const item of itemList) {
        flattenedList.push(item);
      }
    }
    return flattenedList;
  }
}
