import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Message,
  Segment,
  Container,
  Grid,
  Image,
  Header,
} from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserProfile } from "../../actions/userActions";
import { listByUserExpense } from "../../actions/expenseActions";

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

  const expenseListByUser = useSelector((state) => state.expenseListByUser);
  const { expenses, loading: retrivingStateLoading } = expenseListByUser;

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
    dispatch(listByUserExpense());
    // to reduce the total amount of users dispatching it...
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
  const square = { width: 175, height: 175 };

  return (
    <>
      <Container>
        <Grid stackable columns={2}>
          <Grid.Column>
            <Segment>
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
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <Header as="h2">Some description goes here</Header>
              <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
              <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
            </Segment>
          </Grid.Column>
        </Grid>

        <Grid centered stackable columns={3}>
          <Grid.Column>
            <Segment loading={retrivingStateLoading} clearing floated="left">
              <Header as="h2">Total Investment</Header>
              <Segment circular inverted style={square}>
                <Header as="h2" inverted>
                  Pay Now
                  <Header.Subheader>
                    $&nbsp;
                    {expenses
                      ?.reduce((acc, expense) => acc + expense.amount, 0)
                      .toFixed(2)}
                  </Header.Subheader>
                </Header>
              </Segment>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment loading={retrivingStateLoading} clearing floated="left">
              <Header as="h2">Expense Count</Header>
              <Segment circular style={square}>
                <Header as="h2">
                  Total
                  <Header.Subheader>
                    {expenses?.length}&nbsp;items
                  </Header.Subheader>
                </Header>
              </Segment>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment loading={retrivingStateLoading} clearing floated="left">
              <Header as="h2">Total</Header>
              <Segment circular inverted style={square}>
                <Header as="h2" inverted>
                  Buy Now
                  <Header.Subheader>$10.99</Header.Subheader>
                </Header>
              </Segment>
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
    </>
  );
};

export default UpdateProfile;
