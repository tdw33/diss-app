import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//components
import Navbar from "./components/Navbar";
import { CanvasProvider } from "./components/TestContext";
//pages
import Home from "./pages/Home";
import Quesitons from "./pages/Questions";
import Theory from "./pages/Theory";

function App() {
  // nav bar
  // canvas
  //form entry for answer
  //questions with hints
  return (
    <CanvasProvider>
      <Router forceRefresh={true}>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/questions">
            <Quesitons />
          </Route>
          <Route path="/theory">
            <Theory />
          </Route>
        </Switch>
      </Router>
    </CanvasProvider>
  );
}

export default App;
