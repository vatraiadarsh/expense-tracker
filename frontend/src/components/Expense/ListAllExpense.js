import React, { useEffect } from "react";
import {
  Icon,
  Menu,
  Button,
  Label,
  Table,
  Loader,
  Message,
  Dimmer,
} from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { listAllExpense } from "../../actions/expenseActions";
import { useHistory } from "react-router-dom";

function ListAllExpense() {
  const dispatch = useDispatch();

  const history = useHistory();
  const expenseListAll = useSelector((state) => state.expenseListAll);
  const { loading, error, expenses } = expenseListAll;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(listAllExpense());
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
              <Table.HeaderCell>Recorded By</Table.HeaderCell>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Category</Table.HeaderCell>
              <Table.HeaderCell>Amount</Table.HeaderCell>
              <Table.HeaderCell>Notes</Table.HeaderCell>
              <Table.HeaderCell>Incurred On</Table.HeaderCell>
              <Table.HeaderCell>Recorded On</Table.HeaderCell>
              <Table.HeaderCell>Shared By</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {expenses.map((expense) => (
              <Table.Row>
                <Table.Cell>
                  {expense.recorded_by._id === userInfo._id ? (
                    <Label ribbon color="red">
                      {expense.recorded_by.name}
                    </Label>
                  ) : (
                    <Label ribbon color="black">
                      {expense.recorded_by.name}
                    </Label>
                  )}
                </Table.Cell>
                <Table.Cell>{expense.title}</Table.Cell>
                <Table.Cell>{expense.category}</Table.Cell>
                <Table.Cell>$ {expense.amount}</Table.Cell>
                <Table.Cell>{expense.notes}</Table.Cell>
                <Table.Cell>
                  {new Date(expense.incurred_on).toDateString()}
                </Table.Cell>
                <Table.Cell>{expense.createdAt.substring(0, 10)}</Table.Cell>
                <Table.Cell>
                  {expense.shared_by.length === 0 && <h5>No Share</h5>}
                  {expense.shared_by.map((r) => (
                    <>
                      <strong key={r._value}>{r.label} &nbsp;</strong>
                    </>
                  ))}
                </Table.Cell>
              </Table.Row>
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
}

export default ListAllExpense;
