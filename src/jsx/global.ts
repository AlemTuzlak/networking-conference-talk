/**
 * Global JSX declarations
 * This makes h and Fragment available globally without explicit imports
 */

import { h, Fragment } from './runtime';

// Declare global variables for JSX
declare global {
  const h: typeof import('./runtime').h;
  const Fragment: typeof import('./runtime').Fragment;
}

// Make h and Fragment available globally
(globalThis as any).h = h;
(globalThis as any).Fragment = Fragment;

export { h, Fragment };
