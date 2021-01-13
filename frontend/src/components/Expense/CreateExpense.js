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
} from "semantic-ui-react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useDispatch, useSelector } from "react-redux";
import { createExpense } from "../../actions/expenseActions";

function CreateExpense() {
  const dispatch = useDispatch();

  const expenseCreate = useSelector((state) => state.expenseCreate);
  const { loading, error, success } = expenseCreate;

  const usersList = useSelector((state) => state.usersList);
  const { users } = usersList;

  const INITIAL_STATE = {
    title: "klsdf",
    amount: "32",
    category: "sdfsdf",
    incurred_on: new Date(),
    shared_by: [],
    notes: "lkmclds",
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

  const handleSelectChange = (selectedOption) => {
    setExpense((prevState) => ({ ...prevState, shared_by: selectedOption }));
  };

  const submitHandler = (e) => {
    const { title, amount, category, incurred_on, shared_by, notes } = expense;
    e.preventDefault();
    dispatch(
      createExpense(title, amount, category, incurred_on, shared_by, notes)
    );
  };

  const userOptions = users.map((user) => ({
    label: user.name,
    value: user._id,
  }));

  const animatedComponents = makeAnimated();

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
              fluid={true}
              icon="pencil alternate"
              iconPosition="left"
              label="Title"
              name="title"
              placeholder="Title"
              value={expense.title}
              onChange={handlechange}
            />
            <Form.Input
              fluid={true}
              icon="dollar sign"
              iconPosition="left"
              label="Amount"
              type="Number"
              name="amount"
              placeholder="Amount"
              value={expense.amount}
              onChange={handlechange}
            />

            <Form.Group widths="equal">
              <Form.Input
                fluid={true}
                icon="buromobelexperte"
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

            <Form.Field>
              <label>Expense Shared By</label>

              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                value={expense.shared_by}
                isMulti
                isSearchable
                options={userOptions}
                name="shared_by"
                onChange={handleSelectChange}
              />
            </Form.Field>

            <Form.TextArea
              fluid={true}
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
