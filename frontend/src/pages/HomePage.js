import React from "react";
import { Container, Header } from "semantic-ui-react";
import ListAllExpense from "../components/Expense/ListAllExpense";

const HomePage = () => (
  <Container>
    <Header as="h2">All expenses</Header>
    <ListAllExpense/>
  </Container>
);

export default HomePage;
