// components/TodoList.js
import { Box, Typography, TextField, IconButton, Stack, InputBase, Checkbox } from "@mui/material";
import { useContext, useState } from "react";
import { TodosContext } from "../context/todosContext";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export default function TodoList() {
  const { pages, setPages, activePageId, darkMode, setDarkMode } = useContext(TodosContext);
  const [taskInput, setTaskInput] = useState("");

  const activePage = pages.find(p => p.id === activePageId) || pages[0];

  const updatePageTitle = (val) => {
    setPages(pages.map(p => p.id === activePage.id ? { ...p, title: val } : p));
  };

  const addTask = (e) => {
    if (e.key === 'Enter' && taskInput.trim()) {
      const newTask = { id: Date.now(), title: taskInput, isComplete: false };
      setPages(pages.map(p => p.id === activePage.id ? { ...p, todos: [...p.todos, newTask] } : p));
      setTaskInput("");
    }
  };

  const updateTodo = (id, newTitle) => {
    setPages(pages.map(p => p.id === activePage.id ? {
      ...p, todos: p.todos.map(t => t.id === id ? { ...t, title: newTitle } : t)
    } : p));
  };

  const toggleTodo = (id) => {
    setPages(pages.map(p => p.id === activePage.id ? {
      ...p, todos: p.todos.map(t => t.id === id ? { ...t, isComplete: !t.isComplete } : t)
    } : p));
  };

  const deleteTodo = (id) => {
    setPages(pages.map(p => p.id === activePage.id ? {
      ...p, todos: p.todos.filter(t => t.id !== id)
    } : p));
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="flex-end" sx={{ mb: 4 }}>
        <IconButton onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
        </IconButton>
      </Stack>

      {/* Page Title Edit */}
      <InputBase
        fullWidth
        multiline
        value={activePage.title}
        onChange={(e) => updatePageTitle(e.target.value)}
        placeholder="Untitled"
        sx={{ fontSize: 42, fontWeight: 800, mb: 4, px: 1 }}
      />

      {/* New Task Input */}
      <Box sx={{ mb: 2, px: 1 }}>
        <InputBase
          fullWidth
          placeholder="Add New ToDo🕸️"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          onKeyDown={addTask}
          sx={{ fontSize: 16, opacity: 0.6 }}
        />
      </Box>

      {/* Tasks List */}
      <Box>
        {activePage.todos.map((todo) => (
          <Box key={todo.id} sx={{ 
            display: "flex", alignItems: "center", py: 0.5, px: 1,
            '&:hover': { bgcolor: 'action.hover' }, borderRadius: 1,
            '&:hover .del-btn': { opacity: 1 }
          }}>
            <Checkbox checked={todo.isComplete} onChange={() => toggleTodo(todo.id)} size="small" />
            <InputBase
              fullWidth
              value={todo.title}
              onChange={(e) => updateTodo(todo.id, e.target.value)}
              sx={{ 
                ml: 1, fontSize: 15,
                textDecoration: todo.isComplete ? "line-through" : "none",
                color: todo.isComplete ? "text.disabled" : "inherit"
              }}
            />
            <IconButton className="del-btn" size="small" sx={{ opacity: 0 }} onClick={() => deleteTodo(todo.id)}>
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}
      </Box>
    </Box>
  );
}