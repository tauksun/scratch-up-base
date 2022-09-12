import "./css/App.css";
import logo from "./images/logo.jpg";
import Form from "./components/Form";

function App() {
  return (
    <div id="homepage">
      <img className="logo" src={logo} alt="scratch up logo" />
      <Form />
    </div>
  );
}

export default App;
