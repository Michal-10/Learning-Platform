import type React from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import type { AppDispatch, RootState } from "../states/store"
import { loginUser, registerUser } from "../states/authSlice"
import {
  Box,
  Button,
  CardContent,
  TextField,
  Typography,
  CircularProgress,
  Link as MuiLink,
  Container,
  Paper,
  Divider,
  Alert,
} from "@mui/material"
import LoginIcon from "@mui/icons-material/Login"
import PersonAddIcon from "@mui/icons-material/PersonAdd"

const LoginRegister: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { loading, error } = useSelector((s: RootState) => s.auth)
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true)
  const [form, setForm] = useState({ name: "", phone: "" })
  const [touched, setTouched] = useState({ name: false, phone: false })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setTouched(prev => ({ ...prev, [name]: true }))
  }

  const isNameValid = form.name.trim().length >= 2
  const isPhoneValid = /^[0-9]{10,}$/.test(form.phone)

  const handleSubmit = async () => {
    setTouched({ name: true, phone: true })
    if (!isNameValid || !isPhoneValid) return

    const action = isLogin ? loginUser : registerUser
    const res = await dispatch(action(form))
    localStorage.setItem("userToken", res.payload.token);
    if (res.meta.requestStatus === "fulfilled") {
      navigate(isLogin ? "/" : "/HomePage")
    }
  }

  return (
    <Container maxWidth="sm">
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="70vh">
        <Paper
          elevation={8}
          sx={{
            width: "100%",
            maxWidth: 400,
            borderRadius: 2,
            overflow: "hidden",
            direction: "rtl",
          }}
        >
          <Box
            sx={{
              bgcolor: "primary.main",
              color: "white",
              p: 3,
              textAlign: "center",
            }}
          >
            {isLogin ? <LoginIcon sx={{ fontSize: 40, mb: 1 }} /> : <PersonAddIcon sx={{ fontSize: 40, mb: 1 }} />}
            <Typography variant="h4" fontWeight="bold">
              {isLogin ? "התחברות" : "הרשמה"}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>
              {isLogin ? "ברוך שובך לפלטפורמה" : "הצטרף אלינו היום"}
            </Typography>
          </Box>

          <CardContent sx={{ p: 4 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {typeof error === "string" ? error : "אירעה שגיאה, נסה שוב"}
              </Alert>
            )}

            <Box display="flex" flexDirection="column" gap={3}>
              <TextField
                name="name"
                label="שם מלא"
                value={form.name}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                required
                error={touched.name && !isNameValid}
                helperText={touched.name && !isNameValid ? "נא להזין לפחות 2 תווים" : ""}
              />

              <TextField
                name="phone"
                label="מספר טלפון"
                value={form.phone}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                required
                error={touched.phone && !isPhoneValid}
                helperText={touched.phone && !isPhoneValid ? "מספר טלפון חייב להכיל לפחות 10 ספרות" : ""}
                placeholder="0501234567"
              />

              <Button
                onClick={handleSubmit}
                disabled={loading || !isNameValid || !isPhoneValid}
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{
                  py: 1.5,
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  gap: 1,
                  flexDirection: "row-reverse",
                }}
                startIcon={
                  loading ? <CircularProgress size={20} color="inherit" /> : isLogin ? <LoginIcon /> : <PersonAddIcon />
                }
              >
                {loading ? "מעבד..." : isLogin ? "התחבר" : "הירשם"}
              </Button>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box textAlign="center">
              <Typography variant="body2" color="text.secondary">
                {isLogin ? "אין לך חשבון?" : "כבר יש לך חשבון?"}
              </Typography>
              <MuiLink
                component="button"
                onClick={() => setIsLogin(!isLogin)}
                underline="hover"
                color="primary"
                fontWeight="bold"
                sx={{
                  mt: 1,
                  fontSize: "1rem",
                  cursor: "pointer",
                  border: "none",
                  background: "none",
                }}
              >
                {isLogin ? "הירשם כאן" : "התחבר כאן"}
              </MuiLink>
            </Box>
          </CardContent>
        </Paper>
      </Box>
    </Container>
  )
}

export default LoginRegister
