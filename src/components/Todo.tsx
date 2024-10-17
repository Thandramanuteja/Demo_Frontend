import React, { useState } from 'react';
import { useTodos } from '../context/TodoContext';
import TodoItem from './TodoItem';
import {
  Container,
  TextField,
  Button,
  Select,
  MenuItem,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const Todo: React.FC = () => {
  const { todos, addTodo, editTodo, deleteTodo, filter, setFilter } = useTodos();
  const [newTask, setNewTask] = useState('');

  const filteredTodos = filter === 'all' ? todos : todos.filter(todo => todo.status === filter);

  const handleAddTodo = () => {
    if (newTask.trim()) {
      addTodo(newTask);
      setNewTask('');
    }
  };

  return (
    <Container className="todo-app" maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        Todo List
      </Typography>
      <form role="form" onSubmit={(e) => { e.preventDefault(); handleAddTodo(); }}>
        <TextField
          fullWidth
          variant="outlined"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          style={{ marginBottom: '10px', paddingRight: '4px' }}
        />
        <Button variant="contained" color="primary" type="submit" style={{ height: '46px' }}>
          Add
        </Button>
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          variant="outlined"
          style={{ marginLeft: '10px', height: '46px' }}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="not_started">Not Started</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </Select>
      </form>
      {todos.length === 0 ? (
        <Typography variant="body1" align="center" style={{ marginTop: '20px' }}>
          No todos available
        </Typography>
      ) : (
        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Task</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  editTodo={editTodo}
                  deleteTodo={deleteTodo}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default Todo;
