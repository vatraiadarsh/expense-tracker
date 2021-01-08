import React, { useEffect } from "react";
import { format, formatDistance, formatRelative, subDays } from "date-fns";
import {
  Icon,
  Menu,
  Table,
  Loader,
  Message,
  Dimmer,
} from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { listByUserExpense } from "../../actions/expenseActions";
import {listAllUsers} from "../../actions/userActions"

function ListByUserExpense() {
  const dispatch = useDispatch();

  const expenseListByUser = useSelector((state) => state.expenseListByUser);
  const { loading, error, expense } = expenseListByUser;

  useEffect(() => {
    dispatch(listByUserExpense());
    dispatch(listAllUsers())
  }, [dispatch]);
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
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {expense.map((exp) => (
              <>
                <Table.Row>
                  <Table.Cell>{exp.title}</Table.Cell>
                  <Table.Cell>{exp.category}</Table.Cell>
                  <Table.Cell>$ {exp.amount}</Table.Cell>
                  <Table.Cell>{exp.notes}</Table.Cell>
                  <Table.Cell>
                    {new Date(exp.incurred_on).toDateString()}
                  </Table.Cell>
                  <Table.Cell>{exp.createdAt.substring(0, 10)}</Table.Cell>
                  <Table.Cell>
                    {exp.shared_by.length === 0 && <h5>No Share</h5>}
                    {exp.shared_by.map((r) => (
                      <>
                        <strong>{r.label}  &nbsp;</strong>
                      </>
                    ))}
                  </Table.Cell>
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

export default ListByUserExpense;
