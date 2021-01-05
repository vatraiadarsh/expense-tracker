import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/App/Header";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";



const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/profile" component={ProfilePage} />

        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
