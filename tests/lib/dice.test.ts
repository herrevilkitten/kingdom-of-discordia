import { Dice } from "../../src/lib/dice"; // this will be your custom import
import { expect } from "chai";

describe("Dice", () => {
  it("should parse dice strings correctly", () => {
    const DICE = [
      [1, 8],
      [2, 4, 1],
      [4, 5, 0],
    ];
    for (let [amount, sides, modifier] of DICE) {
      modifier = modifier ?? 0;
      let text = `${amount}d${sides}`;
      if (modifier) {
        if (modifier < 0) {
          text = text + `${modifier}`;
        } else {
          text = text + `+${modifier}`;
        }
      }
      const result = Dice.parse(text);
      expect(result).to.eql({ amount, sides, modifier });
    }
  });
});
