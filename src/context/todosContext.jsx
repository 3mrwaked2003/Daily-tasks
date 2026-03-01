// context/todosContext.js
import { createContext, useState, useEffect } from "react";

export const TodosContext = createContext();

export function TodosProvider({ children }) {
  const [pages, setPages] = useState(() => {
    const saved = localStorage.getItem("notion_pages");
    return saved ? JSON.parse(saved) : [{ id: "1", title: "New Page", icon: "📝", todos: [] }];
  });

  const [activePageId, setActivePageId] = useState(pages[0].id);

  // حالة الدارك مود
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem("notion_pages", JSON.stringify(pages));
  }, [pages]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <TodosContext.Provider value={{ 
      pages, setPages, 
      activePageId, setActivePageId, 
      darkMode, setDarkMode 
    }}>
      {children}
    </TodosContext.Provider>
  );
}