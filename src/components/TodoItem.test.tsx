import { render, fireEvent, screen } from '@testing-library/react';
import TodoItem from './TodoItem';
import { Todo } from '../context/TodoContext';

const mockEditTodo = jest.fn();
const mockDeleteTodo = jest.fn();

const todoItem: Todo = {
  id: 1,
  task: 'Test Task',
  completed: false,
  status: 'active',
};

describe('TodoItem Component', () => {
  beforeEach(() => {
    render(<TodoItem todo={todoItem} editTodo={mockEditTodo} deleteTodo={mockDeleteTodo} />);
  });

  test('renders todo task and status correctly when not editing', () => {
    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  test('allows editing of todo', () => {
    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Updated Task' } });

    const updateButton = screen.getByRole('button', { name: /update/i });
    fireEvent.click(updateButton);

    expect(mockEditTodo).toHaveBeenCalledWith(todoItem.id, 'Updated Task', 'active');
  });

  test('calls deleteTodo when delete button is clicked', () => {
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);
    expect(mockDeleteTodo).toHaveBeenCalledWith(todoItem.id);
  });
});
