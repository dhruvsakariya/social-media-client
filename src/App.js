import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
// import MenuBar from "./components/MenuBar";
// import 'semantic-ui-css/semantic.min.css'
import "./App.css";
export default function App() {
  return (
    <Router>
      {/* <MenuBar /> */}
      <div>
        <nav>
          <ul className="nav-items">
            <li className="nav-item">
              <Link className="link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="link" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="link" to="/register">
                Register
              </Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
