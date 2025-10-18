/**
 * Simple client-side router
 */

export type Route = {
  path: string;
  component: () => Node;
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

  navigate(path: string) {
    window.history.pushState({}, '', path);
    this.render();
  }

  private render() {
    const path = window.location.pathname;
    const route = this.routes.find((r) => r.path === path) || this.routes[0];

    if (route !== this.currentRoute) {
      this.currentRoute = route;
      this.container.innerHTML = '';
      const component = route.component();
      this.container.appendChild(component);
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

export function navigate(path: string) {
  if (routerInstance) {
    routerInstance.navigate(path);
  }
}
