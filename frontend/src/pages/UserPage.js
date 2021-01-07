import React from "react";
import { Container } from "semantic-ui-react";
import ListAllUsers from "../components/Users/ListAllUsers";
function UserPage() {
  return (
    <>
      <Container>
        <ListAllUsers />
      </Container>
    </>
  );
}

export default UserPage;
