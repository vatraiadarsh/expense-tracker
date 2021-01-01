import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu, Container, Image, Icon } from "semantic-ui-react";

const Header = ({ location: { pathname } }) => {
  const isActive = (route) => {
    return route === pathname;
  };

  return (
    <>
      <Menu stackable inverted fluid id="menu">
        <Container text>
          <Link to="/">
            <Menu.Item header active={isActive("/")}>
              <Icon color="black" name="user secret" size="large" />
              <Icon color="yellow" name="money" size="large" />
            </Menu.Item>
          </Link>
          <Link to="/login">
            <Menu.Item header active={isActive("/login")}>
              <Icon name="sign in" size="large" />
              LogIn
            </Menu.Item>
          </Link>

          <Link to="/register">
            <Menu.Item header active={isActive("/register")}>
              <Icon name="signup" size="large" />
              Register
            </Menu.Item>
          </Link>
        </Container>
      </Menu>
    </>
  );
};

export default withRouter(Header);
