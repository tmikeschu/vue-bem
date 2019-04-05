import compose from "ramda/src/compose";
import filter from "ramda/src/filter";
import map from "ramda/src/map";
import toPairs from "ramda/src/toPairs";
import head from "ramda/src/head";
import last from "ramda/src/last";
import concat from "ramda/src/concat";
import reduce from "ramda/src/reduce";
import ifElse from "ramda/src/ifElse";
import always from "ramda/src/always";
import isNil from "ramda/src/isNil";
import of from "ramda/src/of";
import join from "ramda/src/join";
import pair from "ramda/src/pair";
import curryN from "ramda/src/curryN";

// Protip: `concat` takes a singular element OR an array.
// `concat`ing an empty array B to an array A returns the same array A
// and `concat`ing an array A to an empty array B returns array A
// [1].concat([]) === [1] === [].concat([1])
//
// The default values are empty arrays for a more polymorphic interface.
// i.e., you can supply the plural or singular forms without needed a lot of
// `if` branching.

// see bem.spec.js for more

const filterModifiers = compose(
  map(head),
  filter(last),
  toPairs,
);

const makeElement = block =>
  reduce(
    compose(
      join("__"),
      pair,
    ),
    block,
  );

const bem = curryN(
  2,
  (block, { element, elements = [], modifiers = {} } = {}) => {
    const selector = compose(
      makeElement(block),
      ifElse(isNil, always(elements), of),
    )(element);

    return compose(
      join(" "),
      concat(of(selector)),
      map(
        compose(
          join("--"),
          pair(selector),
        ),
      ),
      filterModifiers,
    )(modifiers);
  },
);

export const mixin = {
  computed: {
    block() {
      return bem(this.$options.name);
    },
  },
};

export default bem;
