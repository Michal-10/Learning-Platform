import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../states/store"
import { fetchUsers } from "../states/userSlice"
import { getAllPrompts } from "../states/promptsSlice"
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  CircularProgress,
  Card,
  CardContent,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material"
import PrintIcon from "@mui/icons-material/Print"
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings"
import PeopleIcon from "@mui/icons-material/People"
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import PromptDetailDialog from "./PromptDetailDialog"

const AdminDashboard = () => {
  const dispatch = useDispatch<AppDispatch>()
  const usersState = useSelector((s: RootState) => s.users)
  const promptsState = useSelector((s: RootState) => s.prompts)
  const printRef = useRef<HTMLDivElement>(null)

  const [selectedPrompt, setSelectedPrompt] = useState<any>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    dispatch(fetchUsers())
    dispatch(getAllPrompts())
  }, [dispatch])

  const handlePrint = () => {
    window.print()
  }

  const handleRowClick = (prompt: any) => {
    setSelectedPrompt(prompt)
    setDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
    setSelectedPrompt(null)
  }

  if (usersState.loading || promptsState.loading) {
    return (
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh" flexDirection="column" gap={2}>
          <CircularProgress size={60} />
          <Typography variant="h6">טוען נתונים...</Typography>
        </Box>
      </Container>
    )
  }

  const totalUsers = usersState.users.length
  const totalPrompts = promptsState.prompts.length
  const avgPromptsPerUser = totalUsers > 0 ? (totalPrompts / totalUsers).toFixed(1) : 0

  return (
    <Container maxWidth="lg">
      {/* Header */}
      <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <AdminPanelSettingsIcon sx={{ fontSize: 40, color: "primary.main", mr: 2 }} />
            <Typography variant="h4" component="h1" fontWeight="bold" color="primary.main">
              לוח ניהול
            </Typography>
          </Box>

          <Tooltip title="הדפס טבלה">
            <IconButton
              onClick={handlePrint}
              color="primary"
              size="large"
              sx={{
                bgcolor: "primary.light",
                color: "white",
                "&:hover": { bgcolor: "primary.main" },
                "@media print": { display: "none" },
              }}
            >
              <PrintIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={3} sx={{ mb: 4 }}>
          <Card elevation={2} sx={{ flex: 1, textAlign: "center", bgcolor: "primary.light", color: "white" }}>
            <CardContent>
              <PeopleIcon sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4" fontWeight="bold">
                {totalUsers}
              </Typography>
              <Typography variant="body1">סה"כ משתמשים</Typography>
            </CardContent>
          </Card>

          <Card elevation={2} sx={{ flex: 1, textAlign: "center", bgcolor: "secondary.light", color: "white" }}>
            <CardContent>
              <QuestionAnswerIcon sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4" fontWeight="bold">
                {totalPrompts}
              </Typography>
              <Typography variant="body1">סה"כ פרומפטים</Typography>
            </CardContent>
          </Card>

          <Card elevation={2} sx={{ flex: 1, textAlign: "center", bgcolor: "success.light", color: "white" }}>
            <CardContent>
              <TrendingUpIcon sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4" fontWeight="bold">
                {avgPromptsPerUser}
              </Typography>
              <Typography variant="body1">ממוצע פרומפטים למשתמש</Typography>
            </CardContent>
          </Card>
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ borderRadius: 2 }} ref={printRef}>
        <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
          <Typography variant="h6" fontWeight="bold">
            טבלת נתונים מפורטת
          </Typography>
        </Box>

        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="admin data table">
            <TableHead>
              <TableRow sx={{ bgcolor: "grey.100" }}>
                <TableCell align="right" sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                  משתמש
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                  קטגוריה
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                  תת־קטגוריה
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                  שאלה
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                  תשובה
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {promptsState.prompts.map((p: any) => {
                const user = usersState.users.find((u) => u.id === p.userId)
                return (
                  <TableRow
                    key={p.id}
                    onClick={() => handleRowClick(p)}
                    sx={{
                      "&:nth-of-type(odd)": { bgcolor: "action.hover" },
                      "&:hover": { bgcolor: "primary.light", color: "white", cursor: "pointer" },
                      transition: "all 0.2s ease-in-out",
                    }}
                  >
                    <TableCell align="right">
                      <Chip label={user?.name || p.userId} color="primary" variant="outlined" size="small" />
                    </TableCell>
                    <TableCell align="right">
                      <Chip label={p.category_id.name } color="secondary" size="small" />
                    </TableCell>
                    <TableCell align="right">
                      <Chip label={p.sub_category_id.name } color="info" size="small" />
                    </TableCell>
                    <TableCell align="right" sx={{ maxWidth: 200 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                        title={p.prompt}
                      >
                        {p.prompt}
                      </Typography>
                    </TableCell>
                    <TableCell align="right" sx={{ maxWidth: 300 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                        title={p.response}
                      >
                        {p.response}
                      </Typography>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {promptsState.prompts.length === 0 && (
          <Box sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="h6" color="text.secondary">
              אין נתונים להצגה
            </Typography>
          </Box>
        )}
      </Paper>

      <PromptDetailDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        selectedPrompt={selectedPrompt}
        users={usersState.users}
      />
    </Container>
  )
}

export default AdminDashboard
