import { Contents } from "../contents";
import { Thing } from "../thing";
import { ItemLocation, Item } from "./item";
import { WearableSlot, Wearable } from "./item/wearable";
import { Weighable } from "./weighable";

export interface PeopleLocation {
  people: Contents<Character>;
}

export class CharacterPrototype {}

export class Character extends Thing implements Weighable, ItemLocation {
  type = "character";
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

  moveTo(location: PeopleLocation) {
    this.moveFrom();
    location.people.add(this);
  }

  moveFrom() {
    this.location?.people?.delete(this);
  }
}
