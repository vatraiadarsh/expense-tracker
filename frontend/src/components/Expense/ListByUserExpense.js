import React, { useEffect, useState } from "react";
import {
  Icon,
  Menu,
  Button,
  Table,
  Loader,
  Message,
  Header,
  Modal,
  Dimmer,
} from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import UpdateExpanse from "../Expense/UpdateExpanse";
import { deleteExpense, listByUserExpense } from "../../actions/expenseActions";
import { listAllUsers } from "../../actions/userActions";
import { useHistory } from "react-router-dom";

function ListByUserExpense() {
  const dispatch = useDispatch();
  const history = useHistory();

  const expenseListByUser = useSelector((state) => state.expenseListByUser);
  const { loading, error, expenses } = expenseListByUser;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const expenseDelete = useSelector((state) => state.expenseDelete);
  const {
    error: expenseDeleteError,
    success: expenseDeleteSuccess,
    loading: expenseDeleteLoading,
  } = expenseDelete;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(listByUserExpense());
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
        <Table color="green" celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Category</Table.HeaderCell>
              <Table.HeaderCell>Amount</Table.HeaderCell>
              <Table.HeaderCell>Notes</Table.HeaderCell>
              <Table.HeaderCell>Incurred On</Table.HeaderCell>
              <Table.HeaderCell>Recorded On</Table.HeaderCell>
              <Table.HeaderCell>Shared By</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {expenses.map((expense, i) => (
              <List key={expense._id} expense={expense} />
            ))}
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="8">
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

  function List({ expense }) {
    const [updatemodal, setUpdateModal] = useState(false);
    const [deletemodal, setDeleteModal] = useState(false);

    function handleDelete(id) {
      dispatch(deleteExpense(id));
    }

    return (
      <Table.Row>
        <Table.Cell>{expense.title}</Table.Cell>
        <Table.Cell>{expense.category}</Table.Cell>
        <Table.Cell>$ {expense.amount}</Table.Cell>
        <Table.Cell>{expense.notes}</Table.Cell>
        <Table.Cell>{new Date(expense.incurred_on).toDateString()}</Table.Cell>
        <Table.Cell>{expense.createdAt.substring(0, 10)}</Table.Cell>
        <Table.Cell>
          {expense?.shared_by?.length === 0 && <h5>No Share</h5>}
          {expense.shared_by.map((r) => (
            <>
              <strong key={r._value}>{r.label} &nbsp;</strong>
            </>
          ))}
        </Table.Cell>
        <Table.Cell>
          <Button
            color="linkedin"
            icon="edit outline"
            onClick={() => setUpdateModal(true)}
          />
          <Modal
            closeIcon
            onClose={() => setUpdateModal(false)}
            onOpen={() => setUpdateModal(true)}
            open={updatemodal}
          >
            <Modal.Header>Edit an Expense</Modal.Header>
            <Modal.Content>
              <UpdateExpanse expense={expense} />
            </Modal.Content>
          </Modal>
          <Button
            color="youtube"
            icon="trash alternate"
            onClick={() => setDeleteModal(true)}
          />
          <Modal
            closeIcon
            onClose={() => setDeleteModal(false)}
            onOpen={() => setDeleteModal(true)}
            open={deletemodal}
            dimmer="blurring"
          >
            {expenseDeleteSuccess ? (
              <Header as="h5" inverted color="red">
                This expense is already deleted!&nbsp;&nbsp;Please reload the
                page to view the changes
              </Header>
            ) : (
              <Modal.Header>Confirm Delete</Modal.Header>
            )}
            <Modal.Content>
              {expenseDeleteSuccess ? (
                <Header
                  as="h3"
                  color="green"
                  content="Expense Deleted Successfully"
                />
              ) : (
                <Header
                  as="h3"
                  color="red"
                  content=" Are you sure you want to delete this Expense ?"
                />
              )}
              {expenseDeleteLoading ? (
                <Dimmer active>
                  <Loader />
                </Dimmer>
              ) : (
                ""
              )}
              {expenseDeleteError ? <Message negative content={error} /> : ""}
            </Modal.Content>
            <Modal.Actions>
              <Button content="cancel" onClick={() => setDeleteModal(false)} />
              <Button
                negative
                icon="trash"
                labelPosition="right"
                content="Delete"
                disabled={expenseDeleteSuccess}
                onClick={() => handleDelete(expense._id)}
              />
            </Modal.Actions>
          </Modal>
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default ListByUserExpense;
