// Create a simple component
function App() {
  const handleClick = () => {
    alert("Button clicked!");
  };

  return (
    <div className="app">
      <h1 style={{ color: "blue", fontSize: "2rem" }}>Hello from JSX!</h1>
      <p>This is JSX without React - pure DOM elements!</p>
      <button onClick={handleClick}>Click me!</button>

      <div className="list">
        <h2>Features:</h2>
        <ul>
          <li>No React needed</li>
          <li>Pure DOM manipulation</li>
          <li>Event handlers work</li>
          <li>Styles work</li>
        </ul>
      </div>
    </div>
  );
}

// Mount the app
const root = document.querySelector("#app");
if (root) {
  const appElement = App();
  root.appendChild(appElement);
}
