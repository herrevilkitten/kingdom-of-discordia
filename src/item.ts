export abstract class Thing {
  abstract type: string;
  id = '';
  name = '';
  description = '';
}

interface Weighable {
  getWeight(): number;
}

function isWeighable(thing: any): thing is Weighable {
  return "getWeight" in thing;
}

export class Contents<T extends Thing> implements Weighable {
  readonly allThings = new Set<T>();
  readonly things = new Map<string, Set<T>>();

  add(thing: T) {
    this.allThings.add(thing);
    if (!this.things.get(thing.type)) {
      this.things.set(thing.type, new Set<T>());
    }
    this.things.get(thing.type)?.add(thing);
  }

  remove(thing: T) {
    this.allThings.delete(thing);
    if (!this.things.get(thing.type)) {
      this.things.set(thing.type, new Set<T>());
    }
    this.things.get(thing.type)?.delete(thing);
  }

  getWeight() {
    return [...this.allThings].reduce((prev, curr) => {
      if (isWeighable(curr)) {
        return prev + curr.getWeight();
      }
      return prev;
    }, 0);
  }
}

export interface ItemLocation {
  items: Contents<Item>;
}

export interface PeopleLocation {
  people: Contents<Character>;
}

export class CharacterPrototype {

}

export class Room extends Thing implements ItemLocation, PeopleLocation {
  type = 'room';
  items = new Contents<Item>();
  people = new Contents<Character>();
}

export class Character extends Thing implements Weighable, ItemLocation {
  type = 'character';
  items = new Contents<Item>();
  location?: PeopleLocation;
  prototype: CharacterPrototype;
  wearing = new Map<WearableSlot, Wearable>();

  constructor(prototype: CharacterPrototype) {
    super();
    this.prototype = prototype;
  }

  getWearing(slot: WearableSlot) {
    return this.wearing.get(slot);
  }

  getWeight() {
    return this.items.getWeight();
  }
}

const g = new Character(new CharacterPrototype());
const r = new Room();
g.location = r;

export enum ItemType {
  Generic,
  Container,
  Weapon,
  Wearable,
}

export class ItemPrototype {
  type = ItemType.Generic;
  id = '';
  name = '';
  description = '';
}

export class Wearable {
  constructor(private item: Item) { }

  slots = new Set<WearableSlot>();

  isWearableBy(character: Character) {
    for (const slot of this.slots) {
      if (character.getWearing(slot)) {
        return false;
      }
    }
    return true;
  }
}

export class Container {
  constructor(private item: Item) { }

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

export class Item extends Thing implements Weighable {
  type = 'item';
  subtype = '';
  thing = this;
  prototype: ItemPrototype;
  material = Material.Generic;
  weight = 0;
  location?: ItemLocation;

  wearable?: Wearable;
  container?: Container;

  constructor(prototype: ItemPrototype) {
    super();
    this.prototype = prototype;
  }

  getWeight(): number {
    return this.weight + (this.container?.getWeight() ?? 0);
  }
}

export enum WearableSlot {
  Head,
  Chest,
};

export interface MaterialType {
  damageReduction?: (attack: Attack) => number;
}

export const Material: { [name: string]: MaterialType } = {
  Generic: {}
} as const;

export enum WeaponType {
  Dagger,
  Sword,
  Mace,
  Axe,
}

export class Weapon extends Item {
  weaponType = WeaponType.Dagger;
  attack = new Attack();
}

export class Dice {
  constructor(private amount = 0, private sides = 0, private modifier = 0) { }

  roll() {
    let total = this.modifier;
    for (let i = 0; i < this.amount; ++i) {
      total = total + Math.floor(Math.random() * this.sides) + 1;
    }
    return total;
  }
}

export enum AttackType {
  None,
  Slashing,
  Piercing,
  Bashing,
}

export class Attack {
  type = AttackType.None;
  damage = new Dice();
}