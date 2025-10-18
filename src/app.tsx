/**
 * Main App Component with Router
 */

import { Router, setRouterInstance } from "./router";
import { Home } from "./routes/home";
import { ToastContainer } from "./components/Toast";
import type { ToastData } from "./components/Toast";

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

  // Sample toast notification (always shown for now)
  const sampleToasts: ToastData[] = [
    {
      id: "1",
      message: "Welcome to Notes! Your data is saved locally.",
      type: "success",
    },
  ];

  // Create wrapper to hold both router and toast
  const wrapper = document.createElement("div");
  wrapper.appendChild(container);
  wrapper.appendChild(ToastContainer({ toasts: sampleToasts }));

  return wrapper;
}

// Mount the app
const root = document.querySelector("#app");
if (root) {
  const appElement = App();
  root.appendChild(appElement);
}
