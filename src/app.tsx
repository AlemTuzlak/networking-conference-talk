/**
 * Main App Component with Router
 */

import { Router } from "./router";
import { Home } from "./routes/home";
import { NewNoteRoute } from "./routes/notes.new";
import { NoteDetailRoute } from "./routes/notes.$noteId";
import { ToastContainer } from "./components/Toast";
import { initializeSampleData } from "./db/notes";

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
  new Router(container, routes);

  // Create wrapper to hold both router and toast
  const wrapper = document.createElement("div");
  wrapper.appendChild(container);

  return (
    <div>
      {container}
      <ToastContainer />
    </div>
  );
}

// Initialize on module load
await initializeSampleData();
// Mount the app
const root = document.querySelector("#app");
if (root) {
  const appElement = App();
  root.appendChild(appElement);
}
