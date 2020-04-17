import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Homepage from "./pages/homepage";
import EntryView from "./pages/entryview";
import { Switch, Route } from "react-router-dom";
import jstz from "jstz";
import { useDispatch } from "react-redux";
import { SetTimeZone } from "./actions/index";

function App() {
  const getTimeZone = jstz.determine();
  const dispatchTime = useDispatch();
  React.useEffect(() => {
    dispatchTime(SetTimeZone(getTimeZone.name()));
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <Homepage />
        </Route>
        <Route path="/view/:id">
          <EntryView />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
