
import type React from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../states/store"
import { fetchPromptHistory } from "../states/promptsSlice"
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Chip,
  CircularProgress,
  Alert,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Divider,
} from "@mui/material"
import HistoryIcon from "@mui/icons-material/History"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import CategoryIcon from "@mui/icons-material/Category"
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer"

const PromptHistory: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { prompts, loading } = useSelector((s: RootState) => s.prompts)

  useEffect(() => {
    dispatch(fetchPromptHistory())
  }, [dispatch])

  if (loading) {
    return (
      <Container maxWidth="md">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh" flexDirection="column" gap={2}>
          <CircularProgress size={60} />
          <Typography variant="h6">טוען היסטוריה...</Typography>
        </Box>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <HistoryIcon sx={{ fontSize: 40, color: "primary.main", mr: 2 }} />
          <Typography variant="h4" component="h1" fontWeight="bold" color="primary.main">
            היסטוריית שיעורים
          </Typography>
        </Box>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          כאן תוכל לצפות בכל השיעורים שקיבלת ולחזור עליהם בכל עת
        </Typography>

        {prompts.length === 0 ? (
          <Alert severity="info" sx={{ textAlign: "center" }}>
            <Typography variant="h6" gutterBottom>
              עדיין לא יצרת שיעורים
            </Typography>
            <Typography>התחל ליצור פרומפטים כדי לראות אותם כאן</Typography>
          </Alert>
        ) : (
          <Typography variant="h6" gutterBottom>
            סה"כ {prompts.length} שיעורים
          </Typography>
        )}
      </Paper>

      <Stack spacing={3}>
        {prompts.map((prompt, index) => (
          <Accordion
            key={prompt.id}
            elevation={2}
            sx={{
              borderRadius: 2,
              "&:before": { display: "none" },
              mb: 2,
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                bgcolor: "primary.light",
                color: "white",
                borderRadius: "8px 8px 0 0",
                "&.Mui-expanded": {
                  borderRadius: "8px 8px 0 0",
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                <QuestionAnswerIcon sx={{ mr: 2 }} />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" fontWeight="bold">
                    שיעור #{prompts.length - index}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  {prompt.prompt ? `${prompt.prompt.substring(0, 100)}...` : '—'}
                  </Typography>
                </Box>
              </Box>
            </AccordionSummary>

            <AccordionDetails sx={{ p: 3 }}>
              <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={3}
                divider={<Divider orientation="vertical" flexItem sx={{ display: { xs: "none", md: "block" } }} />}
              >
                <Card variant="outlined" sx={{ flex: 1 }}>
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <CategoryIcon sx={{ mr: 1, color: "primary.main" }} />
                      <Typography variant="h6">פרטי השיעור</Typography>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        קטגוריה:
                      </Typography>
                      <Chip label={prompt.category_id.name} color="primary" size="small" sx={{ mb: 1 }} />
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        תת-קטגוריה:
                      </Typography>
                      <Chip label={prompt.sub_category_id.name} color="secondary" size="small" />
                    </Box>
                  </CardContent>
                </Card>

                <Box flex={2}>
                  <Card variant="outlined" sx={{ mb: 2 }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom color="primary.main">
                        ההנחיה שלך:
                      </Typography>
                      <Typography variant="body1" sx={{ fontStyle: "italic" }}>
                        "{prompt.prompt}"
                      </Typography>
                    </CardContent>
                  </Card>

                  <Card
                    variant="outlined"
                    sx={{
                      bgcolor: "success.light",
                      border: "2px solid",
                      borderColor: "success.main",
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" gutterBottom color="success.dark">
                        תשובת ה-AI:
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          lineHeight: 1.7,
                          whiteSpace: "pre-wrap",
                        }}
                      >
                        {prompt.response}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              </Stack>
            </AccordionDetails>
          </Accordion>
        ))}
      </Stack>
    </Container>
  )
}

export default PromptHistory
