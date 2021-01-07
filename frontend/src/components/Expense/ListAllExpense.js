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
import { listAllExpense } from "../../actions/expenseActions";

function ListAllExpense() {
  const dispatch = useDispatch();

  const expenseListAll = useSelector((state) => state.expenseListAll);
  const { loading, error, expense } = expenseListAll;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(listAllExpense());
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
              <Table.HeaderCell>Recorded By</Table.HeaderCell>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Category</Table.HeaderCell>
              <Table.HeaderCell>Amount</Table.HeaderCell>
              <Table.HeaderCell>Notes</Table.HeaderCell>
              <Table.HeaderCell>Incurred On</Table.HeaderCell>
              <Table.HeaderCell>Recorded On</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {expense.map((exp) => (
              <>
                <Table.Row>
                  <Table.Cell>
                    {exp.recorded_by._id === userInfo._id ? (
                      <Label ribbon color="red">
                        {exp.recorded_by.name}
                      </Label>
                    ) : (
                      <Label ribbon color="black">
                        {exp.recorded_by.name}
                      </Label>
                    )}
                  </Table.Cell>
                  <Table.Cell>{exp.title}</Table.Cell>
                  <Table.Cell>{exp.category}</Table.Cell>
                  <Table.Cell>$ {exp.amount}</Table.Cell>
                  <Table.Cell>{exp.notes}</Table.Cell>
                  <Table.Cell>
                    {new Date(exp.incurred_on).toDateString()}
                  </Table.Cell>
                  <Table.Cell>{exp.createdAt.substring(0, 10)}</Table.Cell>
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

export default ListAllExpense;
