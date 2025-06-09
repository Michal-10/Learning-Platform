import { Outlet } from "react-router"
import { Box, Container } from "@mui/material"
import Header from "./components/Header"
import Footer from "./components/Footer"

const Layout = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Container
        component="main"
        maxWidth="lg"
        sx={{
          flexGrow: 1,
          py: 3,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Outlet />
      </Container>
      <Footer />
    </Box>
  )
}

export default Layout
