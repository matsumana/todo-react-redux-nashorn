import React from "react";
import AddTodo from "../containers/addTodo";
import VisibleTodoList from "../containers/visibleTodoList";
import Footer from "./footer";

const App = () => (
    <div>
      <AddTodo />
      <VisibleTodoList />
      <Footer />
    </div>
);

export default App
