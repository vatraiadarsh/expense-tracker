import React, { useState, useEffect } from "react";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import {
  Form,
  Button as SematicBtn,
  Message,
  Segment,
  Icon,
  Container,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createExpense } from "../actions/expenseActions";

const CreateExpensePage = () => {
  const dispatch = useDispatch();

  const expenseCreate = useSelector((state) => state.expenseCreate);
  const { loading, error, success } = expenseCreate;

  const INITIAL_STATE = {
    title: "",
    // amount: "32",
    // category: "2wdsad",
    // incurred_on: "",
    // notes: "adfdsf",
  };
  const [expense, setExpense] = useState(INITIAL_STATE);
  const [message, setMessage] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [selectedDate, handleDateChange] = useState(new Date());

    useEffect(() => {
      const isExpense = Object.values(expense).every((el) => Boolean(el));
      isExpense ? setDisabled(false) : setDisabled(true);
    }, [expense]);

//   const handlechange = (event) => {
//     const { name, value } = event.target;
//     setExpense((prevState) => ({ ...prevState, [name]: value }));
//   };

  const handlechange = (event) => {
    const { name, value } = event.target;
    setExpense((prevState) => ({ ...prevState, [name]: value }));
  };

  const submitHandler = (e) => {
      e.preventDefault();
    dispatch(
      createExpense(
        expense.title,
        // expense.amount,
        // expense.category,
        // expense.incurred_on,
        // expense.notes
      )
    );
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
            //   value={expense.title}
              onChange={handlechange}
            />
            {/* <Form.Input
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
              <Form.Input
                icon="envelope"
                iconPosition="left"
                label="Incurred On"

                name="incurred_on"
                value={selectedDate}
                onChange={handleDateChange}
              >
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DateTimePicker
                    showTodayButton
                    disableFuture
                    inputVariant="outlined"
                    name="incurred_on"
                    value={selectedDate}
                    onChange={handleDateChange}
                  />
                </MuiPickersUtilsProvider>
              </Form.Input>
            </Form.Group>

            <Form.TextArea
              fluid
              label="Notes"
              name="notes"
              placeholder="Notes"
              value={expense.notes}
              onChange={handlechange}
            /> */}

            <SematicBtn
              content="Create Expense"
              type="submit"
              icon="signup"
              disabled={disabled || loading || success}
              color="google plus"
            />
          </Segment>
        </Form>

        <Message attached="bottom">
          <Icon name="user circle outline" />
          Existing user? &nbsp;
          <Link to="/login">
            <a>Log in here</a>&nbsp;
          </Link>
          Instead
        </Message>
      </Container>
    </>
  );
};

export default CreateExpensePage;
