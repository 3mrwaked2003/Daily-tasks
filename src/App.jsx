// App.js
import { ThemeProvider, createTheme, CssBaseline, Box } from "@mui/material";
import { useContext, useMemo } from "react";
import { TodosProvider, TodosContext } from "./context/todosContext";
import Sidebar from "./components/Sidebar";
import TodoList from "./components/TodoList";

function MainApp() {
  const { darkMode } = useContext(TodosContext);

  const theme = useMemo(() => createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      background: {
        default: darkMode ? "#191919" : "#ffffff",
        paper: darkMode ? "#202020" : "#fbfbfa",
      },
    },
    typography: { fontFamily: "'Inter', sans-serif" },
  }), [darkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", height: "100vh" }}>
        <Sidebar />
        <Box sx={{ flex: 1, p: { xs: 2, md: 8 }, overflowY: "auto" }}>
          <Box sx={{ maxWidth: 750, mx: "auto" }}>
            <TodoList />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <TodosProvider>
      <MainApp />
    </TodosProvider>
  );
}