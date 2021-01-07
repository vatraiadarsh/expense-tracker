import React, { useState, useEffect } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Link } from "react-router-dom";
import {
  Form,
  Button as SematicBtn,
  Message,
  Segment,
  Icon,
  Container,
  Checkbox,
} from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { createExpense } from "../../actions/expenseActions";

function CreateExpense() {
  const dispatch = useDispatch();

  const expenseCreate = useSelector((state) => state.expenseCreate);
  const { loading, error, success } = expenseCreate;

  const usersList = useSelector((state) => state.usersList);
  const { users } = usersList;

  const INITIAL_STATE = {
    title: "",
    amount: "",
    category: "",
    incurred_on: new Date(),
    notes: "",
    // shared_by: "",
  };
  const [expense, setExpense] = useState(INITIAL_STATE);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const isExpense = Object.values(expense).every((el) => Boolean(el));
    isExpense ? setDisabled(false) : setDisabled(true);
  }, [expense]);

  const handlechange = (event) => {
    const { name, value } = event.target;
    setExpense((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDateChange = (date) => {
    setExpense((prevState) => ({ ...prevState, incurred_on: date }));
  };

  const submitHandler = (e) => {
    const { title, amount, category, incurred_on, notes } = expense;
    e.preventDefault();
    dispatch(createExpense(title, amount, category, incurred_on, notes));
  };
  return (
    <>
      <Container text>
        <Message
          attached
          icon="plus"
          header="Expenses"
          content="Create a new Expense"
        />

        <Form
          loading={loading}
          success={Boolean(success)}
          error={Boolean(error)}
          onSubmit={submitHandler}
        >
          <Message error header="Oops" content={error} />

          <Segment>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              label="Title"
              name="title"
              placeholder="Title"
              value={expense.title}
              onChange={handlechange}
            />
            <Form.Input
              fluid
              icon="envelope"
              iconPosition="left"
              label="Amount"
              name="amount"
              placeholder="Amount"
              value={expense.amount}
              onChange={handlechange}
            />

            <Form.Group widths="equal">
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                label="Category"
                name="category"
                placeholder="Category"
                value={expense.category}
                onChange={handlechange}
              />
              <Form.Input label="Incurred On">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DateTimePicker
                    showTodayButton
                    disableFuture
                    inputVariant="outlined"
                    name="incurred_on"
                    value={expense.incurred_on}
                    onChange={handleDateChange}
                  />
                </MuiPickersUtilsProvider>
              </Form.Input>
            </Form.Group>

            <Form.Input label="Shared By">
              {users.map((user) => (
                <>
                  <Checkbox key={user._id} value={user._idt} label={user.name} />
                  &nbsp;&nbsp;
                </>
              ))}
            </Form.Input>

            <Form.TextArea
              fluid
              label="Notes"
              name="notes"
              placeholder="Notes"
              value={expense.notes}
              onChange={handlechange}
            />

            <SematicBtn
              content="Create Expense"
              type="submit"
              icon="signup"
              disabled={disabled || loading}
              color="google plus"
            />
          </Segment>
        </Form>

        <Message attached="bottom">
          <Icon name="money bill alternate outline" />
          view the expenses &nbsp;
          <Link to="/expenses">
            <a>click here</a>&nbsp;
          </Link>
          Instead
        </Message>
      </Container>
    </>
  );
}

export default CreateExpense;
