
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../states/store"
import { fetchCategories, fetchSubcategories } from "../states/categoriesSlice"
import { sendPrompt } from "../states/promptsSlice"
import {
  Box,
  Card,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  CircularProgress,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Container,
  Fade,
  Chip,
} from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import CategoryIcon from "@mui/icons-material/Category"
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight"
import EditIcon from "@mui/icons-material/Edit"

export default () => {
  const dispatch = useDispatch<AppDispatch>()
  const { categories, subcategories, loading: catLoading } = useSelector((s: RootState) => s.categories)
  const promptState = useSelector((s: RootState) => s.prompts)

  const [catId, setCatId] = useState<string>("")
  const [resPrompt, setResPrompt] = useState<string>("")
  const [subCatId, setSubCatId] = useState<string>("")
  const [text, setText] = useState("")
  const [activeStep, setActiveStep] = useState(0)

  const steps = ["בחר קטגוריה", "בחר תת-קטגוריה", "כתוב הנחיה"]

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  useEffect(() => {
    if (catId) {
      dispatch(fetchSubcategories(catId))
      setSubCatId("")
      setActiveStep(1)
    }
  }, [catId, dispatch])

  useEffect(() => {
    if (subCatId) {
      setActiveStep(2)
    }
  }, [subCatId])

  const handleSubmit = () => {
    if (catId && subCatId && text.trim()) {
      dispatch(
        sendPrompt({
          category_id: catId,
          sub_category_id: subCatId,
          prompt: text,
        }),
      )
        .then((data) => {
          setResPrompt(data.payload);
        })
        .finally(() => {
          setText("")
          setActiveStep(0)
          setCatId("")
          setSubCatId("")
        })
    }
  }

  const selectedCategory = categories.find((c) => c._id === catId)
  const selectedSubcategory = subcategories.find((s) => s._id === subCatId)

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            color: "primary.main",
            mb: 4,
          }}
        >
          צור שיעור חדש
        </Typography>

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Category Selection */}
          <Card variant="outlined" sx={{ p: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <CategoryIcon sx={{ mr: 1, color: "primary.main" }} />
              <Typography variant="h6">בחירת קטגוריה</Typography>
            </Box>
            <FormControl fullWidth>
              <InputLabel>קטגוריה</InputLabel>
              <Select value={catId} label="קטגוריה" onChange={(e) => setCatId(e.target.value)} disabled={catLoading}>
                <MenuItem value="">
                  <em>בחר קטגוריה</em>
                </MenuItem>
                {categories.map((c) => (
                  <MenuItem key={c._id} value={c._id}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {selectedCategory && <Chip label={selectedCategory.name} color="primary" sx={{ mt: 2 }} />}
          </Card>

          {/* Subcategory Selection */}
          {catId && (
            <Fade in={Boolean(catId)}>
              <Card variant="outlined" sx={{ p: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <SubdirectoryArrowRightIcon sx={{ mr: 1, color: "secondary.main" }} />
                  <Typography variant="h6">בחירת תת-קטגוריה</Typography>
                </Box>
                <FormControl fullWidth>
                  <InputLabel>תת קטגוריה</InputLabel>
                  <Select value={subCatId} label="תת קטגוריה" onChange={(e) => setSubCatId(e.target.value)}>
                    <MenuItem value="">
                      <em>בחר תת קטגוריה</em>
                    </MenuItem>
                    {subcategories.map((s) => (
                      <MenuItem key={s._id} value={s._id}>
                        {s.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {selectedSubcategory && <Chip label={selectedSubcategory.name} color="secondary" sx={{ mt: 2 }} />}
              </Card>
            </Fade>
          )}

          {/* Prompt Input */}
          {subCatId && (
            <Fade in={Boolean(subCatId)}>
              <Card variant="outlined" sx={{ p: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <EditIcon sx={{ mr: 1, color: "success.main" }} />
                  <Typography variant="h6">כתיבת ההנחיה</Typography>
                </Box>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="כתוב כאן את ההנחיה לשיעור..."
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  disabled={!catId || !subCatId || !text.trim() || promptState.loading}
                  onClick={handleSubmit}
                  startIcon={promptState.loading ? <CircularProgress size={20} /> : <SendIcon />}
                  sx={{ gap: 1, py: 1.5, fontWeight: "bold" }}
                >
                  {promptState.loading ? "שולח..." : "שלח הנחיה"}
                </Button>
              </Card>
            </Fade>
          )}

          {/* Response Display */}
          {promptState.prompts.length > 0 && (
            <Fade in={promptState.prompts.length > 0}>
              <Card
                sx={{
                  p: 3,
                  bgcolor: "success.light",
                  color: "success.contrastText",
                  border: "2px solid",
                  borderColor: "success.main",
                }}
              >
                <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                  תגובה אחרונה:
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                  {promptState.prompts[promptState.prompts.length - 1].response || resPrompt}
                </Typography>
              </Card>
            </Fade>
          )}

          {catLoading && (
            <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
              <CircularProgress />
              <Typography sx={{ ml: 2 }}>טוען קטגוריות...</Typography>
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  )
}
