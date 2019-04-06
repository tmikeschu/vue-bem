import compose from "ramda/src/compose"
import filter from "ramda/src/filter"
import map from "ramda/src/map"
import toPairs from "ramda/src/toPairs"
import head from "ramda/src/head"
import last from "ramda/src/last"
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

const stitch = thread =>
  compose(
    join(thread),
    pair,
  )

const makeElement = reduce(stitch("__"))

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
    reduce(stitch(" "), selector),
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

export const plugin = {
  install: Vue => {
    Vue.mixin(mixin)
  },
}
