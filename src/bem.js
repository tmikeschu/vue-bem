// Protip: `concat` takes a singular element OR an array.
// `concat`ing an empty array B to an array A returns the same array A
// and `concat`ing an array A to an empty array B returns array A
// [1].concat([]) === [1] === [].concat([1])
//
// The default values are empty arrays for a more polymorphic interface.
// i.e., you can supply the plural or singular forms without needed a lot of
// `if` branching.

// see bem.spec.js for more

const filterModifiers = modifiers =>
  Object.entries(modifiers)
    .filter(([, bool]) => bool)
    .map(([modifier]) => modifier);

const bem = block => ({ element = [], elements = [], modifiers = {} } = {}) => {
  const selector = elements
    .concat(element)
    .reduce((_selector, el) => `${_selector}__${el}`, block);

  return [selector]
    .concat(filterModifiers(modifiers).map(m => `${selector}--${m}`))
    .join(" ");
};

export const mixin = {
  computed: {
    block() {
      return bem(this.$options.name);
    }
  }
};

export default bem;
