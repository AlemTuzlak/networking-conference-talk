/**
 * Main entry point for JSX runtime
 * Re-exports all necessary functions and types
 */

import { h as createElement, Fragment as FragmentSymbol } from './runtime';

// Named exports
export { createElement as h, FragmentSymbol as Fragment };

// Default export for cleaner imports
export default {
  h: createElement,
  Fragment: FragmentSymbol,
  createElement,
};
