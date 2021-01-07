import React, { useEffect } from "react";
import { format, formatDistance, formatRelative, subDays } from "date-fns";
import {
  Icon,
  Label,
  Menu,
  Table,
  Loader,
  Message,
  Dimmer,
} from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { listAllUsers } from "../../actions/userActions";

function ListAllUsers() {
  const dispatch = useDispatch();

  const usersList = useSelector((state) => state.usersList);
  const { loading, error, users } = usersList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(listAllUsers());
  }, []);
  return (
    <>
      {loading ? (
        <Dimmer active inverted>
          <Loader content="Loading" />
        </Dimmer>
      ) : error ? (
        <Message negative>{error}</Message>
      ) : (
        <Table color="red" celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Created At</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {users.map((user) => (
              <>
                <Table.Row>
                  <Table.Cell>{user.name}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>{user.createdAt.substring(0, 10)}</Table.Cell>
                </Table.Row>
              </>
            ))}
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="7">
                <Menu floated="right" pagination>
                  <Menu.Item as="a" icon>
                    <Icon name="chevron left" />
                  </Menu.Item>
                  <Menu.Item as="a">1</Menu.Item>
                  <Menu.Item as="a">2</Menu.Item>
                  <Menu.Item as="a">3</Menu.Item>
                  <Menu.Item as="a">4</Menu.Item>
                  <Menu.Item as="a" icon>
                    <Icon name="chevron right" />
                  </Menu.Item>
                </Menu>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      )}
    </>
  );
}

export default ListAllUsers;
