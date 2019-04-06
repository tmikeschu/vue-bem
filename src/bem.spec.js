import { plugin, bem, mixin } from "./bem"

describe("bem", () => {
  const block = bem("navbar")
  it("takes an initial block element and returns a function", () => {
    const actual = typeof block
    const expected = "function"
    expect(actual).toEqual(expected)
  })

  describe("the return function given no arguments", () => {
    it("returns a string of the block", () => {
      const actual = block()
      const expected = "navbar"
      expect(actual).toEqual(expected)
    })
  })

  describe("the return function takes an object with", () => {
    describe('an "element" string for __elements one level deep from block', () => {
      it("and returns a string of the selector", () => {
        const actual = block({ element: "list" })
        const expected = "navbar__list"
        expect(actual).toEqual(expected)
      })
    })

    describe('an "elements" array for nested __elements', () => {
      it("and returns a string of the selector", () => {
        const actual = block({ elements: ["list", "item"] })
        const expected = "navbar__list__item"
        expect(actual).toEqual(expected)
      })
    })

    describe('a "modifiers" object for --modifiers', () => {
      it("and returns a string of the selector", () => {
        const actual = block({
          modifiers: { active: true, transparent: true },
        })
        const expected = "navbar navbar--active navbar--transparent"
        expect(actual).toEqual(expected)
      })

      it("filters out falsey modifiers", () => {
        const actual = block({
          modifiers: {
            active: true,
            transparent: null,
            disabled: false,
            whatever: undefined,
          },
        })
        const expected = "navbar navbar--active"
        expect(actual).toEqual(expected)
      })
    })
  })
})

describe("mixin", () => {
  const component = {
    $options: {
      name: "blockNode",
    },
  }
  const boundMixin = mixin.computed.bem.bind(component)()

  it("defines a block property on the factory function", () => {
    const actual = boundMixin.block
    const expected = "blockNode"
    expect(actual).toEqual(expected)
  })

  it("stores the component name on the factory function", () => {
    const actual = boundMixin({ element: "elementNode" })
    const expected = "blockNode__elementNode"
    expect(actual).toEqual(expected)
  })
})

describe("plugin", () => {
  const makeVue = () => {
    const mixins = []
    return {
      mixin(m) {
        mixins.push(m)
      },
      mixins() {
        return mixins
      },
      use(plugin) {
        plugin.install(this)
      },
    }
  }

  it("defines an install interface for Vue to `use`", () => {
    const Vue = makeVue()
    const before = Vue.mixins()
    expect(before).toEqual([])

    Vue.use(plugin)

    const after = Vue.mixins()
    const expected = [mixin]
    expect(after).toEqual(expected)
  })
})
