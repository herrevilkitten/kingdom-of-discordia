import dotenv from "dotenv";
import { Character, Container, Room } from "./item";

dotenv.config();

const room = new Room();
const item = new Container(room);
room.addInventory(item);
const player = new Character(room);
room.addPerson(player);

const room2 = new Room();
player.moveTo(room2);
console.log(room2);