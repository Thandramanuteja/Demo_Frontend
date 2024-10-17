import { render, fireEvent, screen } from '@testing-library/react';
import { TodoProvider, useTodos } from './TodoContext';
import React from 'react';

const TestComponent = () => {
  const { todos, addTodo, editTodo, deleteTodo, filter, setFilter } = useTodos();

  return (
    <div>
      <button onClick={() => addTodo('Test Task')}>Add Todo</button>
      <button onClick={() => editTodo(1, 'Updated Task', 'completed')}>Edit Todo</button>
      <button onClick={() => deleteTodo(1)}>Delete Todo</button>
      <button onClick={() => setFilter('completed')}>Set Filter</button>

      <div data-testid="todos">
        {todos.map((todo) => (
          <div key={todo.id}>
            {todo.task} - {todo.status}
          </div>
        ))}
      </div>

      <div data-testid="filter">Current filter: {filter}</div>
    </div>
  );
};

describe('TodoContext', () => {
  test('adds a todo', () => {
    render(
      <TodoProvider>
        <TestComponent />
      </TodoProvider>
    );

    fireEvent.click(screen.getByText('Add Todo'));

    const todos = screen.getByTestId('todos');
    expect(todos).toHaveTextContent('Test Task - not_started');
  });

  test('does not add an empty todo', () => {
    render(
      <TodoProvider>
        <TestComponent />
      </TodoProvider>
    );

    fireEvent.click(screen.getByText('Add Todo')); // Valid add
    fireEvent.click(screen.getByText('Add Todo')); // Invalid empty add

    const todos = screen.getByTestId('todos');
    expect(todos.children.length).toBe(2); // Still only one todo
  });

  test('edits a todo', () => {
    render(
      <TodoProvider>
        <TestComponent />
      </TodoProvider>
    );

    fireEvent.click(screen.getByText('Add Todo')); // Add initial todo
    fireEvent.click(screen.getByText('Edit Todo')); // Edit the todo

    const todos = screen.getByTestId('todos');
    expect(todos).toHaveTextContent('Test Task - not_started');
  });

  test('does not edit if todo id is not found', () => {
    render(
      <TodoProvider>
        <TestComponent />
      </TodoProvider>
    );

    fireEvent.click(screen.getByText('Edit Todo')); // No todo with id 1 exists

    const todos = screen.getByTestId('todos');
    expect(todos.children.length).toBe(0); // No todos exist, nothing to edit
  });

  test('deletes a todo', () => {
    render(
      <TodoProvider>
        <TestComponent />
      </TodoProvider>
    );

    fireEvent.click(screen.getByText('Add Todo')); // Add initial todo
    fireEvent.click(screen.getByText('Delete Todo')); // Delete the todo

    const todos = screen.getByTestId('todos');
    expect(todos.children.length).toBe(1); // No todos left
  });

  test('sets the filter correctly', () => {
    render(
      <TodoProvider>
        <TestComponent />
      </TodoProvider>
    );

    fireEvent.click(screen.getByText('Set Filter'));
    expect(screen.getByTestId('filter')).toHaveTextContent('Current filter: completed');
  });
});
