import React from "react";
import {connect} from "react-redux";
import {addTodo} from "../actions";

const AddTodo = connect()(({dispatch}) => {

  let input;

  const submit = e => {
    e.preventDefault();
    if (!input.value.trim()) {
      return
    }

    dispatch(addTodo(input.value));
    input.value = ''
  };

  return (
      <div>
        <form onSubmit={submit}>
          <input ref={node => input = node} />
          <button type="submit">Add Todo</button>
        </form>
      </div>
  );
});

export default AddTodo
