// components/Sidebar
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, Button, Divider } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DescriptionIcon from '@mui/icons-material/Description';
import { useContext } from "react";
import { TodosContext } from "../context/todosContext";

export default function Sidebar() {
  const { pages, setPages, activePageId, setActivePageId, darkMode } = useContext(TodosContext);

  const addNewPage = () => {
    const newPage = { 
      id: Date.now().toString(), 
      title: "Untitled", 
      icon: "📄", 
      todos: [] 
    };
    setPages([...pages, newPage]);
    setActivePageId(newPage.id); 
  };

  return (
    <Box sx={{ 
      width: 260, 
      bgcolor: darkMode ? "#202020" : "#fbfbfa", 
      height: "100vh", 
      borderRight: "1px solid", 
      borderColor: "divider",
      display: "flex",
      flexDirection: "column"
    }}>
      <Box sx={{ p: 2, pb: 1 }}>
        <Typography variant="subtitle2" sx={{ opacity: 0.5, fontWeight: 700, fontSize: 11 }}>
          WORKSPACE
        </Typography>
      </Box>

      <List sx={{ flex: 1, overflowY: 'auto', px: 1 }}>
        {pages.map((page) => (
          <ListItem 
            key={page.id}
            onClick={() => setActivePageId(page.id)}
            sx={{ 
              borderRadius: 1, 
              cursor: 'pointer',
              mb: 0.5,
              bgcolor: activePageId === page.id ? (darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)") : "transparent",
              '&:hover': { bgcolor: darkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)" }
            }}
          >
            <ListItemIcon sx={{ minWidth: 30, fontSize: 18 }}>{page.icon}</ListItemIcon>
            <ListItemText 
              primary={page.title || "Untitled"} 
              primaryTypographyProps={{ fontSize: 14, noWrap: true, fontWeight: activePageId === page.id ? 600 : 400 }} 
            />
          </ListItem>
        ))}
      </List>

      <Divider />
      <Box sx={{ p: 1 }}>
        <Button 
          fullWidth 
          startIcon={<AddIcon />} 
          onClick={addNewPage}
          sx={{ justifyContent: 'flex-start', color: 'text.secondary', textTransform: 'none' }}
        >
          Add a page
        </Button>
      </Box>
    </Box>
  );
}