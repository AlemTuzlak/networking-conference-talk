/**
 * JSX runtime for creating DOM elements without React
 */

type Props = Record<string, any> | null;
type Child = Node | string | number | boolean | null | undefined;
type Children = Child[];

/**
 * Creates a DOM element from JSX
 * @param tag - HTML tag name, function component, or Fragment symbol
 * @param props - Element properties and attributes
 * @param children - Child elements
 */
export function h(
  tag: string | symbol | Function,
  props: Props,
  ...children: Children
): Node | DocumentFragment {
  // Handle function components
  if (typeof tag === 'function') {
    const componentProps = { ...props, children: children.length === 1 ? children[0] : children };
    return tag(componentProps);
  }

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

  // Create element (check if it's an SVG element)
  const svgTags = ['svg', 'path', 'circle', 'rect', 'line', 'polyline', 'polygon', 'g', 'defs', 'clipPath', 'linearGradient', 'radialGradient', 'stop', 'ellipse', 'text', 'tspan', 'use'];
  const isSvg = svgTags.includes(tag as string);
  const element = isSvg
    ? document.createElementNS('http://www.w3.org/2000/svg', tag as string)
    : document.createElement(tag as string);

  // Apply props
  if (props) {
    Object.entries(props).forEach(([key, value]) => {
      if (key === 'className') {
        element.setAttribute('class', value);
      } else if (key === 'style' && typeof value === 'object') {
        Object.assign((element as HTMLElement).style, value);
      } else if (key === 'defaultValue') {
        // Handle defaultValue for input/textarea
        if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
          element.value = String(value);
        }
      } else if (key === 'defaultChecked') {
        // Handle defaultChecked for checkboxes/radio buttons
        if (element instanceof HTMLInputElement) {
          element.checked = Boolean(value);
        }
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
