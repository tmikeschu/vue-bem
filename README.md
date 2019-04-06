# vue bmx

(v)ue (b)em mi(x)in

![bmx gif](https://media.giphy.com/media/wRawPQwxRMCbe/giphy.gif)

[BEM](http://getbem.com/introduction/) is a great way to namespace DOM elements.
If you're like me, however, you can't stand manually writing `__` and `--` over
and over again.

`"Todo__list__item Todo__list__item--completed"`

No thanks!

Following [Vue](https://vuejs.org/)'s many pleasant declarative template patterns, use this mixin
to name your blocks, elements, and modifiers in a more declarative style.
Let the mixin take care of implementing dashes and low-dashes alike.

## API

The public interface for the mixin is a function called `bem`.

The block of the component is defined by the `name` property on the Vue
component.

Given a component:

```vue
<script>
export default {
  name: "Calculator",
  data() {
    return {
      atZero: true,
      ...
    };
  },
};
</script>
```

### Blocks

Vue

```vue
<div :class="bem.block">...</div>
```

HTML

```html
<div class="Calculator">...</div>
```

### Elements : String | [String]

- `element`

Vue

```vue
<div :class="bem({element: "screen"})">...</div>
```

HTML

```html
<div class="Calculator__screen">...</div>
```

- `elements`

Vue

```vue
<div :class="bem({elements: ["screen", "number"})">...</div>
```

HTML

```html
<div class="Calculator__screen__number">...</div>
```

### Modifiers : { String: Bool }

Vue

```vue
<div :class="bem({ modifiers: { atZero } })">...</div>
```

HTML

```html
<div class="Calculator Calculator--atZero">...</div>
```

### All together

Vue

```vue
<div :class="bem.block">
  <div :class="
      bem({
        elements: ["screen", "number"],
        modifiers: { atZero, disabled: false, success: true }
      })
    "
  >
    ...
  </div>
</div>
```

HTML

```html
<div class="Calculator">
  <div
    class="Calculator__screen__number Calculator__screen__number--atZero Calculator__screen__number--success"
  >
    ...
  </div>
</div>
```

## Configuration

To make the `bem` function globally available to all Vue components:

- Plugin (recommended):

```js
import Vue from "vue"
import App from "./App.vue"
import { bemPlugin } from "vue-bmx"

Vue.use(bemPlugin)

new Vue({
  render: h => h(App),
}).$mount("#app")
```

- Global mixin ([use with caution](https://vuejs.org/v2/guide/mixins.html#Global-Mixin)):

```js
import Vue from "vue"
import App from "./App.vue"
import { bemMixin } from "vue-bmx"

Vue.mixin(bemMixin)

new Vue({
  render: h => h(App),
}).$mount("#app")
```

Alternatively, import the mixin on a per-component basis:

```vue
<script>
import bemMixin from "vue-bmx"

export default {
  name: "Calculator",
  mixins: [bemMixin],
}
</script>
```

## Local Development

- Clone the directory
- `npm install && npm test`

## Ramda Golf

If you check out the source code, you'll see a lot of utility functions
imported from the [Ramda](https://ramdajs.com) library. I wanted to have some
fun and stitch together as much library code as possible. If some of the code
seems gratuitously abstract or needlessly clever, you are not wrong 😇.

## Tools

- [Prettier](https://prettier.io/)
- [Eslint](https://eslint.org/)
- [Ramda](https://ramdajs.com/)
- [Jest](https://jestjs.io/)
- [Babel](https://babeljs.io/)
- [Travis](https://travis-ci.com/)

## Contributing

Interested in expanding or improving the API?

1. Reach out to me and say hello! I'd love to hear about what you're interested
   in.

2. Once we've confirmed what you can work on, fork this repo and work on your
   masterpiece.

3. Once your work is done, squash your work to a single commit, and open a PR
   from your feature branch to this repo's master branch.
