/**
 * Main App Component with Router
 */

import { Router, setRouterInstance } from "./router";
import { Home } from "./routes/home";

function App() {
  const container = document.createElement("div");
  container.id = "router-outlet";

  // Define routes
  const routes = [
    { path: "/", component: Home },
    // Add more routes here as needed
  ];

  // Initialize router
  const router = new Router(container, routes);
  setRouterInstance(router);

  return container;
}

// Mount the app
const root = document.querySelector("#app");
if (root) {
  const appElement = App();
  root.appendChild(appElement);
}
