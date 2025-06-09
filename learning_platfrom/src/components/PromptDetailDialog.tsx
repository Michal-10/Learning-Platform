
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Card,
  CardContent,
  Box,
  Chip,
  Paper,
  IconButton,
  Stack,
  Container,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"

interface PromptDetailDialogProps {
  open: boolean
  onClose: () => void
  selectedPrompt: any
  users: any[]
}

const PromptDetailDialog = ({ open, onClose, selectedPrompt, users }: PromptDetailDialogProps) => {
  if (!selectedPrompt) return null

  const user = users.find((u) => u.id === selectedPrompt.userId)

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2, maxHeight: "90vh" },
      }}
    >
      <DialogTitle
        sx={{
          bgcolor: "primary.main",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          פרטי פרומפט מלאים
        </Typography>
        <IconButton onClick={onClose} sx={{ color: "white" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        <Container sx={{ py: 3 }}>
          <Stack spacing={3}>
            {/* User Info */}
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary.main">
                  פרטי משתמש
                </Typography>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      שם משתמש:
                    </Typography>
                    <Chip label={user?.name || selectedPrompt.userId} color="primary" sx={{ mt: 0.5 }} />
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      תאריך יצירה:
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 0.5 }}>
                      {new Date(selectedPrompt.createdAt).toLocaleString("he-IL")}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom color="secondary.main">
                  קטגוריות
                </Typography>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      קטגוריה ראשית:
                    </Typography>
                    <Chip label={selectedPrompt.category_id.name} color="secondary" />
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      תת-קטגוריה:
                    </Typography>
                    <Chip label={selectedPrompt.sub_category_id.name} color="info" />
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            {/* Question */}
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom color="warning.main">
                  השאלה המלאה
                </Typography>
                <Paper
                  elevation={1}
                  sx={{
                    p: 2,
                    bgcolor: "grey.50",
                    border: "1px solid",
                    borderColor: "warning.light",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      whiteSpace: "pre-wrap",
                      lineHeight: 1.6,
                      fontStyle: "italic",
                    }}
                  >
                    "{selectedPrompt.prompt}"
                  </Typography>
                </Paper>
              </CardContent>
            </Card>

            {/* Answer */}
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom color="success.main">
                  התשובה המלאה מה-AI
                </Typography>
                <Paper
                  elevation={1}
                  sx={{
                    p: 2,
                    bgcolor: "success.light",
                    color: "success.contrastText",
                    border: "2px solid",
                    borderColor: "success.main",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      whiteSpace: "pre-wrap",
                      lineHeight: 1.7,
                    }}
                  >
                    {selectedPrompt.response}
                  </Typography>
                </Paper>
              </CardContent>
            </Card>
          </Stack>
        </Container>
      </DialogContent>

      <DialogActions sx={{ p: 2, bgcolor: "grey.50" }}>
        <Button onClick={onClose} variant="contained" color="primary">
          סגור
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default PromptDetailDialog
