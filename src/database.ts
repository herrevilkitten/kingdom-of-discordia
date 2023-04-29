import { Character, CharacterPrototype, Item, ItemPrototype, Room } from "./item";

export const World = {
  rooms: new Map<string, Room>(),
  items: new Map<string, Item>(),
  characters: new Map<string, Character>(),
  prototypes: {
    items: new Map<string, ItemPrototype>(),
    characters: new Map<string, CharacterPrototype>(),
  }
};