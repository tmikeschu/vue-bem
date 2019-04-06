# Vue BEM

[BEM](http://getbem.com/introduction/) is a great way to namespace DOM elements.
If you're like me, however, you can't stand manually writing `__` and `--` over
and over again.

`"Todo__list__item Todo__list__item--completed"`

No thanks!

With `bemMixin`, you can be more declarative about your blocks, elements, and
modifiers, and let the mixin take care of implementing dashes and lodashes
alike.

## Use

```vue
<template>
  <div :class="block()">
    <h1 :class="block({ element: 'header' })">
      Todo List
    </h1>

    <ul :class="block({ element: 'list', modifiers: { red: true })">
      <li
        v-for="(todo, i) in todos"
        :key="i"
        :class="block({ elements: ['list', 'item'], modifiers: { completed: todo.completed })"
      >
        {{ todo.text }}
      </li>
    </ul>
  </div>
</template>

<script>
import bemMixin from "vue-bem";

export default {
  name: "todo",
  mixins: [bemMixin],
  data() {
    return {
      todos: [
        {
          completed: false,
          text: "Understand CSS grid",
        },
        {
          completed: true,
          text: "Simplify my css naming",
        },
      ],
    };
  },
};
</script>
```
