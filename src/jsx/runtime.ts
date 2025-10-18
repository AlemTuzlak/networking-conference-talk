/**
 * JSX runtime for creating DOM elements without React
 */

type Props = Record<string, any> | null;
type Child = Node | string | number | boolean | null | undefined;
type Children = Child[];

/**
 * Creates a DOM element from JSX
 * @param tag - HTML tag name or Fragment symbol
 * @param props - Element properties and attributes
 * @param children - Child elements
 */
export function h(
  tag: string | symbol,
  props: Props,
  ...children: Children
): Node | DocumentFragment {
  // Handle fragments
  if (tag === Fragment) {
    const fragment = document.createDocumentFragment();
    children.flat(Infinity).forEach((child: any) => {
      if (child != null && child !== false && child !== true) {
        fragment.appendChild(
          typeof child === 'string' || typeof child === 'number'
            ? document.createTextNode(String(child))
            : child
        );
      }
    });
    return fragment;
  }

  // Create element
  const element = document.createElement(tag as string);

  // Apply props
  if (props) {
    Object.entries(props).forEach(([key, value]) => {
      if (key === 'className') {
        element.className = value;
      } else if (key === 'style' && typeof value === 'object') {
        Object.assign(element.style, value);
      } else if (key.startsWith('on') && typeof value === 'function') {
        // Event handlers: onClick -> click
        const eventName = key.substring(2).toLowerCase();
        element.addEventListener(eventName, value);
      } else if (typeof value === 'boolean') {
        if (value) {
          element.setAttribute(key, '');
        }
      } else if (value != null) {
        element.setAttribute(key, String(value));
      }
    });
  }

  // Append children
  children.flat(Infinity).forEach((child: any) => {
    if (child != null && child !== false && child !== true) {
      element.appendChild(
        typeof child === 'string' || typeof child === 'number'
          ? document.createTextNode(String(child))
          : child
      );
    }
  });

  return element;
}

/**
 * Fragment symbol for grouping elements without a wrapper
 */
export const Fragment = Symbol('Fragment');
