
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={testRoute}>Test Route</button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

function testRoute() {
  console.log("\n\n ### In test route ### \n\n");
  try {
    console.log("\n\n ###  Trying to hit server  ###\n\n");
    fetch("http://localhost/api/test")
      .then((res) => res.json())
      .then((data) => {
        console.log("\n\n ### Got this from server > > ", data);
      });
  } catch (error) {
    console.log("\n\n ### Error occured while hitting server > ", error);
  }
}

export default App;
