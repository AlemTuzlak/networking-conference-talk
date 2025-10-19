/**
 * Simple client-side router
 */

export type Route = {
  path: string;
  component: (props?: { params: Record<string, string> }) => Node | Promise<Node>;
};

export type NavigateOptions = {
  viewTransition?: boolean;
};

export class Router {
  private routes: Route[] = [];
  private currentRoute: Route | null = null;
  private container: HTMLElement;

  constructor(container: HTMLElement, routes: Route[]) {
    this.container = container;
    this.routes = routes;

    // Listen for popstate (back/forward browser buttons)
    window.addEventListener('popstate', () => this.render());

    // Listen for link clicks
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const link = target.closest('[data-link]');
      if (link) {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (href) {
          this.navigate(href);
        }
      }
    });

    // Initial render
    this.render();
  }

  navigate(path: string, options: NavigateOptions = {}) {
    window.history.pushState({}, '', path);

    if (options.viewTransition) {
      this.renderWithTransition();
    } else {
      this.render();
    }
  }

  private matchRoute(path: string): { route: Route; params: Record<string, string> } | null {
    for (const route of this.routes) {
      const params = this.extractParams(route.path, path);
      if (params !== null) {
        return { route, params };
      }
    }
    return null;
  }

  private extractParams(pattern: string, path: string): Record<string, string> | null {
    const patternParts = pattern.split('/').filter(Boolean);
    const pathParts = path.split('/').filter(Boolean);

    if (patternParts.length !== pathParts.length) {
      return null;
    }

    const params: Record<string, string> = {};

    for (let i = 0; i < patternParts.length; i++) {
      const patternPart = patternParts[i];
      const pathPart = pathParts[i];

      if (patternPart.startsWith(':')) {
        // Dynamic segment
        const paramName = patternPart.slice(1);
        params[paramName] = pathPart;
      } else if (patternPart !== pathPart) {
        // Static segment doesn't match
        return null;
      }
    }

    return params;
  }

  private async render() {
    const path = window.location.pathname;
    const match = this.matchRoute(path) || { route: this.routes[0], params: {} };

    if (match.route !== this.currentRoute) {
      this.currentRoute = match.route;
      this.container.innerHTML = '';
      const component = await match.route.component({ params: match.params });
      this.container.appendChild(component);
    }
  }

  private async renderWithTransition() {
    // Check if View Transitions API is supported
    if ('startViewTransition' in document) {
      // @ts-ignore - View Transitions API type
      await document.startViewTransition(() => this.render()).finished;
    } else {
      // Fallback for browsers that don't support View Transitions
      await this.render();
    }
  }
}

/**
 * Navigate to a route programmatically
 */
let routerInstance: Router | null = null;

export function setRouterInstance(router: Router) {
  routerInstance = router;
}

export function navigate(path: string, options: NavigateOptions = {}) {
  if (routerInstance) {
    routerInstance.navigate(path, options);
  }
}
