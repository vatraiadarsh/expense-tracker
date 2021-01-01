import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/App/Header";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/register" component={RegisterPage} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
