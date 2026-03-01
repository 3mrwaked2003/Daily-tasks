// components/Todo.js
import { Box, Typography, IconButton, Checkbox } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { motion } from "framer-motion";

export default function Todo({ todo, onDelete, onToggle }) {
  return (
    <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Box sx={{ 
        display: "flex", 
        alignItems: "center", 
        py: 0.5, 
        px: 1,
        borderRadius: 1,
        transition: '0.2s',
        '&:hover': { bgcolor: 'action.hover' },
        '&:hover .delete-btn': { opacity: 1 }
      }}>
        <Checkbox 
          checked={todo.isComplete} 
          onChange={() => onToggle(todo.id)}
          sx={{ p: 0.5, '& .MuiSvgIcon-root': { fontSize: 20 } }}
        />
        
        <Box sx={{ flex: 1, ml: 1 }}>
          <Typography sx={{ 
            fontSize: 16, 
            textDecoration: todo.isComplete ? "line-through" : "none",
            color: todo.isComplete ? "text.disabled" : "text.primary"
          }}>
            {todo.title}
          </Typography> 
          {todo.details && (
            <Typography variant="caption" sx={{ color: "text.secondary", display: 'block' }}>
              {todo.details}
            </Typography>
          )}
        </Box>

        <IconButton 
          className="delete-btn" 
          size="small" 
          onClick={() => onDelete(todo)}
          sx={{ opacity: 0, transition: '0.2s' }}
        >
          <DeleteOutlineIcon fontSize="small" />
        </IconButton>
      </Box>
    </motion.div>
  );
}