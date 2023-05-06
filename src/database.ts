import { Character, CharacterPrototype } from "./lib/thing/character";
import { Item, ItemPrototype } from "./lib/thing/item";
import { Room } from "./lib/thing/room";
import * as fs from "fs/promises";
import { join } from "path";
import JSON5 from "json5";

export const World = {
  rooms: new Map<string, Room>(),
  items: new Map<string, Item>(),
  characters: new Map<string, Character>(),
  prototypes: {
    items: new Map<string, ItemPrototype>(),
    characters: new Map<string, CharacterPrototype>(),
  },
};

const AREA_DIR = "./database/areas";
export async function loadAreas() {
  const dir = await fs.opendir(AREA_DIR);
  const areas: {[name: string]: any} = {};
  for await (const dirent of dir) {
    const path = join(AREA_DIR, dirent.name);
    const data = await fs.readFile(path, "utf-8");
    const json = JSON5.parse(data);
    areas[path] = json;
  }
  return areas;
}
