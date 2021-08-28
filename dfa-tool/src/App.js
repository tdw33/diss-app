import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//components
import Navbar from "./components/Navbar";
import { GlobalProvider } from "./components/TestContext";
//pages
import Home from "./pages/Home";
import Quesitons from "./pages/Questions";
import Theory from "./pages/Theory";
import SingleQuestion from "./pages/SingleQuestion";

function App() {
  // below returns the route for each page in the webapp

  return (
    <GlobalProvider>
      <Router forceRefresh={true}>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/questions">
            <Quesitons />
          </Route>
          <Route path="/SingleQuestion/:id">
            <SingleQuestion />
          </Route>
          <Route path="/theory">
            <Theory />
          </Route>
        </Switch>
      </Router>
    </GlobalProvider>
  );
}

export default App;
