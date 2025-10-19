/**
 * Main App Component with Router
 */

import { Router, setRouterInstance } from "./router";
import { Home } from "./routes/home";
import { NewNoteRoute } from "./routes/notes.new";
import { NoteDetailRoute } from "./routes/notes.$noteId";
import { ToastContainer } from "./components/Toast";

function App() {
  const container = document.createElement("div");
  container.id = "router-outlet";

  // Define routes
  const routes = [
    { path: "/", component: Home },
    { path: "/notes/new", component: NewNoteRoute },
    { path: "/notes/:noteId", component: NoteDetailRoute },
  ];

  // Initialize router
  const router = new Router(container, routes);
  setRouterInstance(router);

  // Create wrapper to hold both router and toast
  const wrapper = document.createElement("div");
  wrapper.appendChild(container);
  wrapper.appendChild(ToastContainer());

  return wrapper;
}

// Mount the app
const root = document.querySelector("#app");
if (root) {
  const appElement = App();
  root.appendChild(appElement);
}
