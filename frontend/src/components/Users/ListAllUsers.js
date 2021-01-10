import React, { useState, useEffect, useRef } from "react";
import { format, formatDistance, formatRelative, subDays } from "date-fns";
import {
  Icon,
  Button,
  Checkbox,
  Menu,
  Label,
  Table,
  Loader,
  Message,
  Dimmer,
} from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { listAllUsers, updateUserStatus } from "../../actions/userActions";
import { useHistory } from "react-router-dom";

function ListAllUsers() {
  const dispatch = useDispatch();
  const history = useHistory();

  const usersList = useSelector((state) => state.usersList);
  const { loading, error, users } = usersList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(listAllUsers());
    }
  }, [dispatch, history, userInfo]);

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
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {users.map((user) => (
              <UserStatus key={user._id} user={user} />
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

  function UserStatus({ user }) {
    const [status, setStatus] = useState(user.status === "active");
    const isFirstRun = useRef(true);

    useEffect(() => {
      if (isFirstRun.current) {
        isFirstRun.current = false;
        return;
      }
      dispatch(updateUserStatus(user._id, status ? "active" : "inactive"));
    }, [status]);

    function handleChangeStatus() {
      setStatus((prevState) => !prevState);
    }

    return (
      <Table.Row>
        <Table.Cell>{user.name}</Table.Cell>
        <Table.Cell>{user.email}</Table.Cell>
        <Table.Cell>{user.createdAt.substring(0, 10)}</Table.Cell>

        <Table.Cell>
          {status ? (
            <Label content="active" color="green" />
          ) : (
            <Label content="inactive" color="red" />
          )}
        </Table.Cell>
        <Table.Cell>
          <Checkbox
            toggle
            color="red"
            checked={status}
            onChange={handleChangeStatus}
          />
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default ListAllUsers;
