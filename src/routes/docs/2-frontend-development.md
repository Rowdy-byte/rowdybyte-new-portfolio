## Runes State Management

In Svelte 5, it’s very easy for us to create a global state for our application.

<br>

We’re no longer limited to Svelte components or stores to manage global state. With Svelte 5, we can use runes directly in `.svelte.js` and `.svelte.ts` files.

<br>

Let’s take a look at how we can use global state to control whether the background color of the top navigation bar should be transparent or solid.

<br>

By default, the navbar is slightly transparent to give a nice scrolling effect. However, when the menu is open, it’s not aesthetically pleasing to have the navbar remain transparent while the menu below it has a solid color.

<br>

To fix this, we need to keep track of the menu’s state. For this, we can use Svelte’s `$state()` rune. We’ll create a variable and assign it a state using JavaScript’s `let` keyword for mutability. We’ll use a `boolean` data type, which can be either `true` or `false`.

The default behavior of the menu is that it is closed.

<br>

```ts
let isOpen = $state(false);
```

<br>

Next, we’ll create a `.state.svelte.ts` file in the lib folder of our project. In this file, we’ll define and export a function that returns a method to toggle the `isOpen` variable between `true` and `false`.

<br>

```ts
let isOpen = $state(false);

export function getIsOpen() {
	function toggle() {
		isOpen = !isOpen;
	}
	return {
		get isOpen() {
			return isOpen;
		}
	};
	toggle;
}
```

<br>
<br>

## Menu Component

With our state in place, we can now create a menu component. I’ll name this component `NavMenu.svelte`.
<br>

First, we import the function we created earlier. We can use the `$` alias to import the function from our `lib` folder.
<br>

In our template, we can check `if` `getIsOpen().isOpen` equals `true`. This will only happen when we toggle the state of our `isOpen` variable, which we can do by executing the toggle function.
<br>

```svelte
<script lang="ts">
	import { getIsOpen } from '$lib/state.svelte.ts';

	function toggleIsOpen() {
		getIsOpen().toggle();
	}
</script>

<!-- button for opening the menu -->
<button onclick={toggleIsOpen}>open menu</button>

{#if getIsOpen().isOpen}
	<nav>
		<!-- button for closing the menu -->
		<button onclick={toggleIsOpen}>close menu</button>

		<!-- TODO: add menu content -->
	</nav>
{/if}
```

<br>
<br>

## Conditionally Render Colors

Because we are using Tailwind CSS, it’s straightforward to conditionally render different styles based on our application’s state. With Svelte, we can write JavaScript directly in our markup, which makes it easy to apply conditional logic to Tailwind classes.

<br>

For example, we can use the JavaScript ternary operator to determine which classes to apply. `If` `isOpen` equals `true` `?` (this happens when we click the button and execute the toggle function), we apply a black background color to the navbar.

<br>

When we click the close button and `isOpen` becomes `false`, the menu closes, and the navbar returns to its default color with a blur effect.

<br>

```svelte
<nav class={`${getIsOpen().isOpen ? 'bg-black' : 'bg-black bg-white/50 backdrop-blur-md'}`}>
	<!-- TODO: add navbar content -->
</nav>
```

<br>

## Code Breakdown

In our template we can write JavaScript between curly braces. Then we use template literals because we want to combine expressions (JavaScript) with strings (Tailwind classes). `${}` is a placeholder for embedded JavaScript expressions.
After the questionmark between the first set of quotes we defined our `true` condition, then the set of quotes after the collon defines our `false` condition.
