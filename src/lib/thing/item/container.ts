import { Item } from "../item";

export class Container {
  constructor(private item: Item) {}

  items = new Set<Item>();

  getWeight(): number {
    return [...this.items].reduce((prev, curr) => prev + curr.getWeight(), 0);
  }

  canContain(item: Item) {
    if (item === this.item) {
      return false;
    }

    const parents = new Set<Item>();
    let location = item.location;
    while (location) {
      if (!(location instanceof Item)) {
        return true;
      }
      if (parents.has(location)) {
        return false;
      }
      if (location === this.item) {
        return false;
      }
      parents.add(location);
      location = location.location;
    }
    return true;
  }
}
