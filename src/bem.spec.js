import bem from "./bem";

// Read more about BEM css here: http://getbem.com/introduction/

describe("bem", () => {
  const block = bem("navbar");
  it("takes an initial block element and returns a function", () => {
    const actual = typeof block;
    const expected = "function";
    expect(actual).toEqual(expected);
  });

  describe("the return function takes an object with", () => {
    describe('an "element" string for __elements one level deep from block', () => {
      it("and returns a string of the selector", () => {
        const actual = block({ element: "list" });
        const expected = "navbar__list";
        expect(actual).toEqual(expected);
      });
    });

    describe('an "elements" array for nested __elements', () => {
      it("and returns a string of the selector", () => {
        const actual = block({ elements: ["list", "item"] });
        const expected = "navbar__list__item";
        expect(actual).toEqual(expected);
      });
    });

    describe('a "modifiers" object for --modifiers', () => {
      it("and returns a string of the selector", () => {
        const actual = block({
          modifiers: { active: true, transparent: true },
        });
        const expected = "navbar navbar--active navbar--transparent";
        expect(actual).toEqual(expected);
      });

      it("filters out falsey modifiers", () => {
        const actual = block({
          modifiers: {
            active: true,
            transparent: null,
            disabled: false,
            whatever: undefined,
          },
        });
        const expected = "navbar navbar--active";
        expect(actual).toEqual(expected);
      });
    });
  });
});
