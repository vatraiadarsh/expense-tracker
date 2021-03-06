import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/App/Header";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import ExpensePage from "./pages/ExpensePage";
import UserPage from "./pages/UserPage";


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
          <Route path="/expense" component={ExpensePage} />
          <Route path="/users" component={UserPage} />

        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
