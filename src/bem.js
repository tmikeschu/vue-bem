import compose from "ramda/src/compose"
import filter from "ramda/src/filter"
import map from "ramda/src/map"
import toPairs from "ramda/src/toPairs"
import head from "ramda/src/head"
import last from "ramda/src/last"
import concat from "ramda/src/concat"
import reduce from "ramda/src/reduce"
import ifElse from "ramda/src/ifElse"
import always from "ramda/src/always"
import isNil from "ramda/src/isNil"
import of from "ramda/src/of"
import join from "ramda/src/join"
import pair from "ramda/src/pair"

const filterModifiers = compose(
  map(head),
  filter(last),
  toPairs,
)

const makeElement = block =>
  reduce(
    compose(
      join("__"),
      pair,
    ),
    block,
  )

export const bem = block => ({
  element,
  elements = [],
  modifiers = {},
} = {}) => {
  const selector = compose(
    makeElement(block),
    ifElse(isNil, always(elements), of),
  )(element)

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
  )(modifiers)
}

export const mixin = {
  computed: {
    bem() {
      const { name: block } = this.$options

      return Object.assign(bem(block), { block })
    },
  },
}

export default {
  install: Vue => {
    Vue.mixin(mixin)
  },
}
