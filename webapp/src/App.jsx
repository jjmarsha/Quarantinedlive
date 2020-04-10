import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Homepage from "./pages/homepage";
import EntryView from "./pages/entryview";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <Homepage/>
        </Route>
        <Route path="/view">
          <EntryView/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
