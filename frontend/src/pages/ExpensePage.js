import React, { useState, useEffect } from "react";
import CreateExpense from "../components/Expense/CreateExpense";
import { useSelector } from "react-redux";

import ListByUserExpense from "../components/Expense/ListByUserExpense";

import { Button, Segment, Header, Container, Modal } from "semantic-ui-react";

const ExpensePage = ({ history }) => {
  const [modal, setModal] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [userInfo, history]);

  return (
    <>
      <Container>
        <Segment clearing>
          <Header as="h2" floated="left">
            All expenses recorded by me
          </Header>
          <Header as="h3" floated="right">
            Add a new expense
          </Header>

          <Button
            floated="right"
            icon="add"
            negative
            onClick={() => setModal(true)}
          />

          <Modal
            closeIcon
            onClose={() => setModal(false)}
            onOpen={() => setModal(true)}
            open={modal}
          >
            <Modal.Header>Add an Expense</Modal.Header>
            <Modal.Content>
              <CreateExpense />
            </Modal.Content>
          </Modal>
          <ListByUserExpense/>
        </Segment>
      </Container>
    </>
  );
};

export default ExpensePage;
