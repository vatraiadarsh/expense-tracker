import React, { useState, useEffect } from "react";
import CreateExpense from "../components/Expense/CreateExpense";
import ListExpense from "../components/Expense/ListExpense";

import { Button, Segment, Message, Container, Modal } from "semantic-ui-react";

const ExpensePage = () => {
  const [modal, setModal] = useState(false);


  return (
    <>
      <Container text>
        <Segment>
          <h1>Expense Page</h1>

          <Button icon="add" negative onClick={() => setModal(true)} />

          <Modal
          closeIcon
            onClose={() => setModal(false)}
            onOpen={() => setModal(true)}
            open={modal}
            // dimmer
          >
            <Modal.Header>Add an Expense</Modal.Header>
            <Modal.Content>
              <CreateExpense />
            </Modal.Content>
           
          </Modal>

          <ListExpense />
        </Segment>
      </Container>
    </>
  );
};

export default ExpensePage;
