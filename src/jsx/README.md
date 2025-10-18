# JSX Runtime

This folder contains the custom JSX runtime implementation that allows using JSX syntax without React.

## Files

- **`runtime.ts`** - Core JSX factory functions (`h` and `Fragment`)
- **`types.d.ts`** - TypeScript type definitions for JSX elements and attributes
- **`index.ts`** - Main entry point that re-exports everything

## Usage

**No imports needed!** JSX just works automatically in `.tsx` files:

```tsx
function MyComponent() {
  return (
    <div className="container">
      <h1>Hello JSX!</h1>
    </div>
  );
}
```

The `h` and `Fragment` functions are automatically injected by Vite and available globally.

### Optional: Manual Import

If you prefer explicit imports or need to use `h` directly, you can import it:

```tsx
import JSX from './jsx';  // Default import with h and Fragment
// or
import { h, Fragment } from './jsx';  // Named imports
```

## How It Works

### The `h` Function

The `h` function is a JSX factory that transforms JSX into real DOM elements:

```tsx
// JSX code:
<div className="app">Hello</div>

// Gets transformed to:
h('div', { className: 'app' }, 'Hello')

// Which creates:
const div = document.createElement('div');
div.className = 'app';
div.appendChild(document.createTextNode('Hello'));
```

### Fragment Support

Fragments allow grouping elements without creating a wrapper DOM node:

```tsx
<>
  <h1>Title</h1>
  <p>Paragraph</p>
</>
```

## Features

✅ HTML elements  
✅ Props and attributes  
✅ Event handlers (onClick, onInput, etc.)  
✅ Inline styles as objects  
✅ className support  
✅ Fragments  
✅ Children rendering  
✅ Boolean attributes  

## Configuration

The JSX runtime is configured in:
- `vite.config.ts` - Tells Vite to use `h` as the JSX factory
- `tsconfig.json` - Configures TypeScript for JSX transpilation
