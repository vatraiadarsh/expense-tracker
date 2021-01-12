import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Message,
  Segment,
  Icon,
  Container,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../actions/userActions";

const LoginPage = ({history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { success, error, loading, userInfo } = userLogin;



  const INITIAL_STATE = {
    email: "",
    password: "",
  };
  const [user, setUser] = useState(INITIAL_STATE);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const isUser = Object.values(user).every((el) => Boolean(el));
    isUser ? setDisabled(false) : setDisabled(true);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(user.email, user.password));
  };

  useEffect(() => {
    if (userInfo) {
      history.push("/profile");
    }
  }, [history, userInfo]);

  return (
    <>
      <Container text>
        <Message
          attached
          icon="settings"
          header="Get Started"
          content="Create a new account"
        />

        <Form
          loading={loading}
          success={Boolean(success)}
          error={Boolean(error)}
          onSubmit={submitHandler}
        >
          <Message error header="Oops" content={error} />
          <Segment>
            <Form.Input
              fluid
              icon="envelope"
              iconPosition="left"
              label="Email"
              name="email"
              type="email"
              onChange={handleChange}
              placeholder="Email"
              value={user.email}
            />

            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              label="Password"
              name="password"
              onChange={handleChange}
              type="password"
              placeholder="Password"
              value={user.password}
            />

            <Button
              content="SignIn"
              type="submit"
              icon="sign in"
              disabled={disabled || loading || success}
              color="facebook"
            />
          </Segment>
        </Form>

        <Message attached="bottom">
          <Icon name="user circle" />
          Doesn't had an account? &nbsp;
          <Link to= "/register">
            <a>Register here</a>&nbsp;
          </Link>
          Instead
        </Message>
      </Container>
    </>
  );
};

export default LoginPage;
