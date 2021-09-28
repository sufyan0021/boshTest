import logo from './logo.svg';
import './App.scss';
import Todos from './components/Todos'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Company Name</h2>
      </header>
      <Router>
        <Todos />
      </Router>
    </div>
  );
}

export default App;
