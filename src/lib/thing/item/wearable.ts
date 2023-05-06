import { Character } from "../character";
import { Item } from "../item";

export enum WearableSlot {
  Head,
  Chest,
}

export class Wearable {
  constructor(private item: Item) {}

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

