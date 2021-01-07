import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu, Container, Icon } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";

const Header = ({ location: { pathname } }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const isActive = (route) => {
    return route === pathname;
  };

  const handleLogout = () => {
    dispatch(logout());
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

          {userInfo ? (
            <>
              <Link to="/profile">
                <Menu.Item header active={isActive("/profile")}>
                  <Icon name="signup" size="large" />
                  Profile
                </Menu.Item>
              </Link>
              <Link to="/expense/my">
                <Menu.Item header active={isActive("/expense/my")}>
                  <Icon name="dollar sign" size="large" />
                  Expense
                </Menu.Item>
              </Link>
              <Link to="/users">
                <Menu.Item header active={isActive("/users")}>
                  <Icon name="user" size="large" />
                  Users
                </Menu.Item>
              </Link>
              <Menu.Item onClick={handleLogout} header>
                <Icon name="sign out" size="large" />
                Logout
              </Menu.Item>
            </>
          ) : (
            <>
              <Link to="/register">
                <Menu.Item header active={isActive("/register")}>
                  <Icon name="signup" size="large" />
                  Register
                </Menu.Item>
              </Link>
              <Link to="/login">
                <Menu.Item header active={isActive("/login")}>
                  <Icon name="sign in" size="large" />
                  LogIn
                </Menu.Item>
              </Link>
            </>
          )}
        </Container>
      </Menu>
    </>
  );
};

export default withRouter(Header);
