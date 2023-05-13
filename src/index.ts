import dotenv from "dotenv";
import { Character } from "./lib/thing/character";
import { Item, ItemPrototype } from "./lib/thing/item";
import { Room } from "./lib/thing/room";
import { readAreas } from "./database";

dotenv.config();

const room = new Room();
const item = new Item(new ItemPrototype());

room.items.add(item);
const player = new Character(room);
room.people.add(player);

const room2 = new Room();
player.moveTo(room2);
//console.log(room2);

readAreas().then((areas) => {
//  console.log(areas);
});