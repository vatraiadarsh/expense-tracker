import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Message,
  Segment,
  Container,
  Header,
} from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserProfile } from "../../actions/userActions";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, user } = userDetails;

  const userProfileUpdate = useSelector((state) => state.userProfileUpdate);
  const { success, error } = userProfileUpdate;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.name || !user.email) {
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user]);

  const submitHandler = (e) => {
    // e.preventDefault();
    if (password !== confirmPassword) {
      setMessage(true);
    } else {
      setMessage(false);
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <>
      <Container text>
        <Header as="h2">Update Profile</Header>
        <Form
          loading={loading}
          success={Boolean(success)}
          error={Boolean(error)}
          onSubmit={submitHandler}
        >
          <Message error header="Oops" content={error} />
          <Message success header="Profile Updated Successfully! " />

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
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Form.Input
              fluid
              icon="envelope"
              iconPosition="left"
              label="Email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              label="Password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              label="Confirm Password"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Button
              content="Update"
              type="submit"
              icon="check circle"
              disabled={loading || success}
              color="green"
            />
          </Segment>
        </Form>
      </Container>
    </>
  );
};

export default UpdateProfile;
