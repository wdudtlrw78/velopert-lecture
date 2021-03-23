/** @format */

import React from 'react';
import { useTodoState } from '../TodoContext';
import TodoItem from '../TodoItem';
import './styled.scss';

function TodoList() {
  const todos = useTodoState();
  return (
    <section className="TodoListBlock">
      {todos.map((todo) => (
        <TodoItem key={todo.id} id={todo.id} text={todo.text} done={todo.done} />
      ))}
    </section>
  );
}

export default TodoList;
