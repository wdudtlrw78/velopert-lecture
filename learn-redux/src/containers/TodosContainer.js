import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import Todos from '../components/Todos';
import { addTodo, toggleTodo } from '../modules/todos';

function TodosContainer(todos, addTodo, toggleTodo) {
  const onCreate = useCallback(text => addTodo(text), [addTodo]);
  const onToggle = useCallback(id => toggleTodo(id), [toggleTodo]);

  return <Todos todos={todos} onCreate={onCreate} onToggle={onToggle} />
}

// class형 컴포넌트일때에만 connect() 함수 사용하자

export default connect(
  state => 
({ todos: state.todos }),
{
  addTodo,
  toggleTodo,
})
(TodosContainer);