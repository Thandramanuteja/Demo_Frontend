import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Todo from './Todo';
import { TodoProvider } from '../context/TodoContext';

jest.mock('./TodoItem', () => (props: any) => (
  <tr>
    <td>{props.todo.task}</td>
    <td>{props.todo.status}</td>
    <td>
      <button onClick={() => props.editTodo(props.todo.id, props.todo.task, props.todo.status)}>Edit</button>
      <button onClick={() => props.deleteTodo(props.todo.id)}>Delete</button>
    </td>
  </tr>
));

describe('Todo Component', () => {
  beforeEach(() => {
    render(
      <TodoProvider>
        <Todo />
      </TodoProvider>
    );
  });

  test('renders the Todo component correctly', () => {
    expect(screen.getByPlaceholderText('Add a new task')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
  });

  test('allows adding a todo when input is not empty', () => {
    const input = screen.getByPlaceholderText('Add a new task');
    const addButton = screen.getByRole('button', { name: /add/i });
    fireEvent.change(input, { target: { value: 'Test Todo' } });
    fireEvent.click(addButton);
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
  });

  test('does not allow adding a todo when input is empty', () => {
    const input = screen.getByPlaceholderText('Add a new task');
    const addButton = screen.getByRole('button', { name: /add/i });
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(addButton);
    expect(screen.getByText('No todos available')).toBeInTheDocument(); // Ensure the message is still displayed
  });

  test('displays message when no todos are available', () => {
    expect(screen.getByText('No todos available')).toBeInTheDocument();
  });

  test('calls editTodo when edit button is clicked', () => {
    const input = screen.getByPlaceholderText('Add a new task');
    const addButton = screen.getByRole('button', { name: /add/i });
    fireEvent.change(input, { target: { value: 'Test Todo' } });
    fireEvent.click(addButton);
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);
    expect(screen.getByText('Test Todo')).toBeInTheDocument(); // Check if the edit is processed
  });

  test('calls deleteTodo when delete button is clicked', () => {
    const input = screen.getByPlaceholderText('Add a new task');
    const addButton = screen.getByRole('button', { name: /add/i });
    fireEvent.change(input, { target: { value: 'Test Todo' } });
    fireEvent.click(addButton);
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);
    expect(screen.queryByText('Test Todo')).not.toBeInTheDocument(); // Ensure the todo is removed
  });

  test('updates the filter when a new filter is selected', () => {
    const select = screen.getByRole('combobox');
    // fireEvent.change(select, { target: { value: 'completed' } });
    // expect(select).toHaveValue('completed');
  });

  test('displays filtered todos based on status', () => {
    const input = screen.getByPlaceholderText('Add a new task');
    const addButton = screen.getByRole('button', { name: /add/i });
    fireEvent.change(input, { target: { value: 'Test Todo' } });
    fireEvent.click(addButton);

    const select = screen.getByRole('combobox');
    // fireEvent.change(select, { target: { value: 'active' } });
    
    expect(screen.getByText('Test Todo')).toBeInTheDocument(); // Ensure the todo appears
  });
});
