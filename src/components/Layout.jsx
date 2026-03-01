import { Box } from "@mui/material";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar /> 
      <Box sx={{ flex: 1, p: 4, overflowY: "auto" }}>{children}</Box>
    </Box>
  );
}