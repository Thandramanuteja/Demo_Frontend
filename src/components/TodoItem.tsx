import React, { useState } from 'react';
import { Todo } from '../context/TodoContext';
import {
  TableRow,
  TableCell,
  TextField,
  Select,
  MenuItem,
  Button,
  IconButton,
} from '@mui/material';
import { Edit, Delete, Save } from '@mui/icons-material';

interface TodoItemProps {
  todo: Todo;
  editTodo: (id: number, updatedTask: string, updatedStatus: 'not_started' | 'active' | 'completed') => void;
  deleteTodo: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, editTodo, deleteTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState(todo.task);
  const [updatedStatus, setUpdatedStatus] = useState(todo.status);

  const handleUpdate = () => {
    editTodo(todo.id, updatedTask, updatedStatus);
    setIsEditing(false);
  };

  return (
    <TableRow>
      <TableCell>
        {isEditing ? (
          <TextField
            fullWidth
            value={updatedTask}
            onChange={(e) => setUpdatedTask(e.target.value)}
            variant="outlined"
            size="small"
          />
        ) : (
          <span>{todo.task}</span>
        )}
      </TableCell>
      <TableCell>
        {isEditing ? (
          <Select
            value={updatedStatus}
            onChange={(e) => setUpdatedStatus(e.target.value as 'not_started' | 'active' | 'completed')}
            variant="outlined"
            size="small"
            fullWidth
          >
            <MenuItem value="not_started">Not Started</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </Select>
        ) : (
          <span>{todo.status.charAt(0).toUpperCase() + todo.status.slice(1).replace('_', ' ')}</span>
        )}
      </TableCell>
      <TableCell
      style={{ justifyContent: 'center' }}
      >
        {isEditing ? (
          <Button
            onClick={handleUpdate}
            variant="contained"
            color="primary"
            startIcon={<Save />}
            size="small"
            style={{ marginRight: '10px' }}
          >
            Update
          </Button>
        ) : (
          <IconButton
            onClick={() => setIsEditing(true)}
            color="primary"
            size="small"
            style={{ marginRight: '10px' }}
          >
            <Edit />
          </IconButton>
        )}
        <IconButton
          onClick={() => deleteTodo(todo.id)}
          color="secondary"
          size="small"
        >
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default TodoItem;
