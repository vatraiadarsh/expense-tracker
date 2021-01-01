import React from "react";
import {
  Form,
  Header,
  Button,
  Checkbox,
  Message,
  Segment,
  Icon,
  Container,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
const RegisterPage = () => {
  return (
    <>
      <Container as="text">
        <Message
          attached
          icon="settings"
          header="Get Started"
          content="Create a new account"
        />

        <Form>
          <Segment>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              label="Name"
              name="name"
              placeholder="Name"
            />
            <Form.Input
              fluid
              icon="envelope"
              iconPosition="left"
              label="Email"
              type="email"
              name="email"
              placeholder="Email"
            />

            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              label="Password"
              name="password"
              type="password"
              placeholder="Password"
            />

            <Button
              content="Signup"
              type="submit"
              icon="signup"
              color="facebook"
            />
          </Segment>
        </Form>

        <Message attached="bottom">
          <Icon name="user circle outline" />
          Existing user? &nbsp;
          <Link to="/login">
            <a>Log in here</a>
          </Link>
          Instead
        </Message>
      </Container>
    </>
  );
};

export default RegisterPage;
