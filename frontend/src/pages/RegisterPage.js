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
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";

const RegisterPage = () => {
  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, success, error } = userRegister;

  const INITIAL_STATE = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [user, setUser] = useState(INITIAL_STATE);
  const [message, setMessage] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const isUser = Object.values(user).every((el) => Boolean(el));
    isUser ? setDisabled(false) : setDisabled(true);
  }, [user]);

  const handlechange = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      setMessage(true);
    } else {
      setMessage(false);
      dispatch(register(user.name, user.email, user.password));
    }
  };

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
          <Message
            success
            header="Thanks for signing Up! "
            content="Please wait a moment so that admin can give access to this site"
          />

          {message && (
            <Message
              color="red"
              header="Please check it out!"
              content={"Password doesnot match"}
            />
          )}

          <Segment>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              label="Name"
              name="name"
              onChange={handlechange}
              placeholder="Name"
              value={user.name}
            />
            <Form.Input
              fluid
              icon="envelope"
              iconPosition="left"
              label="Email"
              type="email"
              name="email"
              onChange={handlechange}
              placeholder="Email"
              value={user.email}
            />

            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              label="Password"
              name="password"
              onChange={handlechange}
              type="password"
              placeholder="Password"
              value={user.password}
            />

            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              label="Confirm Password"
              name="confirmPassword"
              onChange={handlechange}
              type="password"
              placeholder="Confirm Password"
              value={user.confirmPassword}
            />

            <Button
              content="Signup"
              type="submit"
              icon="signup"
              disabled={disabled || loading || success}
              color="facebook"
            />
          </Segment>
        </Form>

        <Message attached="bottom">
          <Icon name="user circle outline" />
          Existing user? &nbsp;
          <Link to="/login">
            <a>Log in here</a>&nbsp;
          </Link>
          Instead
        </Message>
      </Container>
    </>
  );
};

export default RegisterPage;
