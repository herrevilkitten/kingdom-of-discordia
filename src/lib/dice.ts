const DICE_PATTERN = /(\d+)d(\d+)([+-]\d+|)/;

export class Dice {
  constructor(private amount = 0, private sides = 0, private modifier = 0) {}

  roll() {
    let total = this.modifier;
    for (let i = 0; i < this.amount; ++i) {
      total = total + Math.floor(Math.random() * this.sides) + 1;
    }
    return total;
  }

  static roll(amount: number, sides: number, modifier = 0) {
    return new Dice(amount, sides, modifier).roll();
  }

  static parse(text: string) {
    const match = DICE_PATTERN.exec(text);
    if (match) {
      const [amount, sides, modifier] = [
        Number(match[1]),
        Number(match[2]),
        match[3] ? Number(match[3]) : 0,
      ];
      return new Dice(amount, sides, modifier);
    }
    return undefined;
  }
}
