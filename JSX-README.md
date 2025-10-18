# JSX Without React

This project demonstrates how to use JSX syntax without React or any framework. JSX is transpiled to plain JavaScript DOM operations using a custom JSX runtime.

## How It Works

### 1. JSX Runtime (`src/jsx-runtime.ts`)

The `h` function is a JSX factory that creates real DOM elements:

```typescript
h('div', { className: 'app' }, 'Hello', child1, child2)
```

This function:
- Creates DOM elements using `document.createElement()`
- Applies props as attributes and event listeners
- Handles special cases like `className`, `style` objects, and event handlers
- Supports Fragments for grouping elements without a wrapper

### 2. Vite Configuration (`vite.config.ts`)

The Vite config tells the transpiler to:
- Use `h` as the JSX factory function
- Use `Fragment` for JSX fragments
- Auto-import these from `jsx-runtime.ts` in every JSX file

### 3. TypeScript Configuration (`tsconfig.json`)

The TypeScript config:
- Sets `jsx: "preserve"` to let Vite handle JSX transpilation
- Uses type definitions from `src/jsx.d.ts` for JSX elements

## Usage

Create a `.tsx` file and write JSX - **no imports needed!**

```tsx
function MyComponent() {
  const handleClick = () => {
    console.log('Clicked!');
  };

  return (
    <div className="container">
      <h1 style={{ color: 'blue' }}>Hello JSX!</h1>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}

// Mount to DOM
document.querySelector('#app')?.appendChild(MyComponent());
```

The JSX runtime is automatically available in all `.tsx` files.

## Features

### ✅ Supported
- HTML elements (div, span, button, etc.)
- Event handlers (onClick, onInput, etc.)
- Inline styles as objects
- className for CSS classes
- Fragments (`<>...</>`)
- Children rendering (text, numbers, nested elements)
- Boolean attributes

### ❌ Not Supported (React-specific features)
- Component state (useState, useEffect, etc.)
- React hooks
- Component re-rendering
- Virtual DOM diffing
- Props spreading with {...props}

## Example

See `src/example.tsx` for a working example.

## Running the Project

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Why Use This?

This approach is perfect when you:
- Want JSX syntax but don't need React's complexity
- Are building simple interactive UIs
- Want to understand how JSX works under the hood
- Need lightweight DOM manipulation with nice syntax
- Don't need component state or lifecycle features
