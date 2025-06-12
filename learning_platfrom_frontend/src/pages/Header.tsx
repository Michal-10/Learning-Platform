
import type React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import type { AppDispatch, RootState } from "../states/store"
import { logout } from "../states/authSlice"
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import { useState } from "react"
import MenuIcon from "@mui/icons-material/Menu"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import HomeIcon from "@mui/icons-material/Home"
import CreateIcon from "@mui/icons-material/Create"
import HistoryIcon from "@mui/icons-material/History"
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings"
import LoginIcon from "@mui/icons-material/Login"
import LogoutIcon from "@mui/icons-material/Logout"

export default () => {
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector((s: RootState) => s.auth.user)
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const handleLogout = () => {
    dispatch(logout())
    sessionStorage.removeItem("userToken")
    navigate("/HomePage")
    setAnchorEl(null)
  }

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar position="static" elevation={4}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: "bold",
            fontSize: { xs: "1rem", sm: "1.25rem" },
          }}
        >
          AI Learning Platform
        </Typography>

        {!isMobile && (
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button color="inherit" component={Link} to="/" startIcon={<HomeIcon />} sx={{ gap: 1, fontWeight: 500 }}>
              בית
            </Button>

            {user.name ? (
              <>
                <Button
                  color="inherit"
                  component={Link}
                  to="/createPrompt"
                  startIcon={<CreateIcon />}
                  sx={{ gap: 1, fontWeight: 500 }}
                >
                  יצירת פרומפט
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  to="/history"
                  startIcon={<HistoryIcon />}
                  sx={{ gap: 1, fontWeight: 500 }}
                >
                  היסטוריה
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  to="/admin"
                  startIcon={<AdminPanelSettingsIcon />}
                  sx={{ gap: 1, fontWeight: 500 }}
                >
                  ניהול
                </Button>
                <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />} sx={{gap:1, fontWeight: 500 }}>
                  התנתק
                </Button>
              </>
            ) : (
              <Button color="inherit" component={Link} to="/eneterToSystem" startIcon={<LoginIcon />} sx={{gap: 1, fontWeight: 500 }}>
                התחבר
              </Button>
            )}
          </Box>
        )}

        {isMobile && (
          <Box>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" onClick={handleMenu}>
              {user.name ? <AccountCircleIcon /> : <MenuIcon />}
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose} component={Link} to="/">
                <HomeIcon sx={{ mr: 1 }} />
                בית
              </MenuItem>
              {user.name ? (
                [
                  <MenuItem key="prompt" onClick={handleClose} component={Link} to="/createPrompt">
                    <CreateIcon sx={{ mr: 1 }} />
                    יצירת פרומפט
                  </MenuItem>,
                  <MenuItem key="history" onClick={handleClose} component={Link} to="/history">
                    <HistoryIcon sx={{ mr: 1 }} />
                    היסטוריה
                  </MenuItem>,
                  <MenuItem key="admin" onClick={handleClose} component={Link} to="/admin">
                    <AdminPanelSettingsIcon sx={{ mr: 1 }} />
                    ניהול
                  </MenuItem>,
                  <MenuItem key="logout" onClick={handleLogout}>
                    <LogoutIcon sx={{ mr: 1 }} />
                    התנתק
                  </MenuItem>,
                ]
              ) : (
                <MenuItem onClick={handleClose} component={Link} to="/eneterToSystem">
                  <LoginIcon sx={{ mr: 1 }} />
                  התחבר
                </MenuItem>
              )}
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  )
}
