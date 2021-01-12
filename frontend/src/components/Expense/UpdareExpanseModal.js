// import React, { useState, useEffect } from "react";
// import DateFnsUtils from "@date-io/date-fns";
// import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
// import { Link } from "react-router-dom";
// import {
//   Form,
//   Button as SematicBtn,
//   Message,
//   Segment,
//   Icon,
//   Container,
// } from "semantic-ui-react";
// import Select from "react-select";
// import makeAnimated from "react-select/animated";
// import { useDispatch, useSelector } from "react-redux";
// import { updateExpense } from "../../actions/expenseActions";

// function UpdateExpanse({ expense: exp }) {
//   const dispatch = useDispatch();
//   const animatedComponents = makeAnimated();

//   const usersList = useSelector((state) => state.usersList);
//   const { users } = usersList;

//   const expenseUpdate = useSelector((state) => state.expenseUpdate);
//   const { error, success, loading } = expenseUpdate;

//   const INITIAL_STATE = {
//     title: "",
//     amount: "",
//     category: "",
//     incurred_on: new Date(),
//     shared_by: [],
//     notes: "",
//   };
//   const [expense, setExpense] = useState(INITIAL_STATE);

//   const handlechange = (event) => {
//     const { name, value } = event.target;
//     setExpense((prevState) => ({ ...prevState, [name]: value }));
//   };

//   const handleDateChange = (date) => {
//     setExpense((prevState) => ({ ...prevState, incurred_on: date }));
//   };

//   const handleSelectChange = (selectedOption) => {
//     setExpense((prevState) => ({ ...prevState, shared_by: selectedOption }));
//   };

//   const submitHandler = (e) => {
//     const { title, amount, category, incurred_on, shared_by, notes } = expense;
//     e.preventDefault();
//     dispatch(
//       updateExpense({
//         _id: exp._id,
//         title,
//         amount,
//         category,
//         incurred_on,
//         shared_by,
//         notes,
//       })
//     );
//   };

//   useEffect(() => {
//     const { title, amount, category, incurred_on, shared_by, notes } = expense;

//     if (!expense.title) {
//       setExpense({
//         title,
//         amount,
//         category,
//         incurred_on,
//         shared_by,
//         notes,
//       });
//     }
//   }, [expense]);

//   const userOptions = users.map((user) => ({
//     label: user.name,
//     value: user._id,
//   }));

//   return (
//     <>
//       {JSON.stringify(expense)}
//       <Container text>
//         <Form
//           loading={loading}
//           success={Boolean(success)}
//           error={Boolean(error)}
//           onSubmit={submitHandler}
//         >
//           <Message error header="Oops" content={error} />

//           <Segment>
//             <Form.Input
//               fluid={true}
//               icon="pencil alternate"
//               iconPosition="left"
//               label="Title"
//               name="title"
//               placeholder="Title"
             
//               onChange={handlechange}
//             />
//             <Form.Input
//               fluid={true}
//               icon="dollar sign"
//               iconPosition="left"
//               label="Amount"
//               type="Number"
//               name="amount"
//               placeholder="Amount"
//               value={exp.amount}
//               onChange={handlechange}
//             />

//             <Form.Group widths="equal">
//               <Form.Input
//                 fluid={true}
//                 icon="buromobelexperte"
//                 iconPosition="left"
//                 label="Category"
//                 name="category"
//                 placeholder="Category"
//                 value={exp.category}
//                 onChange={handlechange}
//               />
//               <Form.Input label="Incurred On">
//                 <MuiPickersUtilsProvider utils={DateFnsUtils}>
//                   <DateTimePicker
//                     showTodayButton
//                     disableFuture
//                     inputVariant="outlined"
//                     name="incurred_on"
//                     value={exp.incurred_on}
//                     onChange={handleDateChange}
//                   />
//                 </MuiPickersUtilsProvider>
//               </Form.Input>
//             </Form.Group>

//             <Form.Field>
//               <label>Expense Shared By</label>

//               <Select
//                 closeMenuOnSelect={false}
//                 components={animatedComponents}
//                 isMulti
//                 isSearchable
//                 options={userOptions}
//                 name="shared_by"
//                 value={exp.shared_by}
//                 onChange={handleSelectChange}
//               />
//             </Form.Field>

//             <Form.TextArea
//               fluid={true}
//               label="Notes"
//               name="notes"
//               placeholder="Notes"
//               value={exp.notes}
//               onChange={handlechange}
//             />

//             <SematicBtn
//               content="Update Expense"
//               type="submit"
//               icon="check circle"
//               disabled={loading}
//               color="green"
//             />
//           </Segment>
//         </Form>

//         <Message attached="bottom">
//           <Icon name="money bill alternate outline" />
//           view the expenses &nbsp;
//           <Link to="/expenses">
//             <a>click here</a>&nbsp;
//           </Link>
//           Instead
//         </Message>
//       </Container>
//     </>
//   );
// }

// export default UpdateExpanse;

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
import { useParams } from "react-router-dom";
import { updateExpense, getExpenseDetails } from "../../actions/expenseActions";

function UpdateExpanse({expenseId}) {
  const dispatch = useDispatch();
  const { id: expenseId } = useParams();

  const usersList = useSelector((state) => state.usersList);
  const { users } = usersList;

  const expenseDetails = useSelector((state) => state.expenseDetails);
  const {
    loading: expenseDetailsLoading,
    error: expenseDetailsError,
    expense: expenseFromDetails,
  } = expenseDetails;

  const expenseUpdate = useSelector((state) => state.expenseUpdate);
  const { error, success, loading } = expenseUpdate;

  const INITIAL_STATE = {
    title: "",
    amount: "",
    category: "",
    incurred_on: new Date(),
    shared_by: [],
    notes: "",
  };
  const [expense, setExpense] = useState(INITIAL_STATE);

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

  useEffect(() => {
    if (!expense.title && expense._id !== expenseId) {
      dispatch(getExpenseDetails(expenseId));
    } else {
      setExpense({
        title: expenseFromDetails.title,
        amount: expenseFromDetails.amount,
        category: expenseFromDetails.category,
        incurred_on: new Date(),
        shared_by: [],
        notes: expenseFromDetails.notes,
      });
    }
  },[dispatch,expenseId,expenseFromDetails]);

  const submitHandler = (e) => {
    const { title, amount, category, incurred_on, shared_by, notes } = expense;
    e.preventDefault();
    dispatch(
      updateExpense({
        _id: exp._id,
        title,
        amount,
        category,
        incurred_on,
        shared_by,
        notes,
      })
    );
  };

  const userOptions = users.map((user) => ({
    label: user.name,
    value: user._id,
  }));

  const animatedComponents = makeAnimated();

  return (
    <>
    {JSON.stringify(expense)}
      <Container text>
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
              value={expenseFromDetails.title}
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
              value={expenseFromDetails.amount}
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
                value={expenseFromDetails.category}
                onChange={handlechange}
              />
              <Form.Input label="Incurred On">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DateTimePicker
                    showTodayButton
                    disableFuture
                    inputVariant="outlined"
                    name="incurred_on"
                    value={expenseFromDetails.incurred_on}
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
              content="Update Expense"
              type="submit"
              icon="check circle"
              disabled={loading}
              color="green"
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

export default UpdateExpanse;
