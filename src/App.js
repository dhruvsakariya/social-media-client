import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import MenuBar from "./components/MenuBar";
import AuthRoute from "./utils/AuthRoute";
import { AuthProvider } from "../src/context/auth";

// import "semantic-ui-css/semantic.min.css";
import "./App.css";
import { Container } from "semantic-ui-react";
import SinglePost from "./components/SinglePost";
export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <>
            <Switch>
              <AuthRoute path="/login" component={Login} />
              <AuthRoute path="/register" component={Register} />
              <Route exact path="/" component={Home} />
              <Route exact path="/posts/:postId" component={SinglePost} />
            </Switch>
          </>
        </Container>
      </Router>
    </AuthProvider>
  );
}
