
import {
    Container,
    Typography,
    Paper,
    Box,
    Button,
    Card,
    CardContent,
    CardActions
  } from "@mui/material"
  import { Link } from "react-router-dom"
  import { useSelector } from "react-redux"
  import type { RootState } from "../states/store"
  import SchoolIcon from "@mui/icons-material/School"
  import CreateIcon from "@mui/icons-material/Create"
  import HistoryIcon from "@mui/icons-material/History"
  
  const HomePage = () => {
    const user = useSelector((s: RootState) => s.auth.user)
  
    return (
      <Container maxWidth="lg" sx={{ direction: "rtl" }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: "bold", color: "primary.main" }}>
            ברוכים הבאים לפלטפורמת הלמידה מבוססת AI
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: "auto" }}>
            צרו פרומפטים מותאמים אישית, שמרו היסטוריית למידה, ונתחו תשובות חכמות עם כוח הבינה המלאכותית
          </Typography>
  
          {!user.name && (
            <Button
              variant="contained"
              size="large"
              component={Link}
              to="/eneterToSystem"
              sx={{ px: 4, py: 1.5, fontSize: "1.1rem" }}
            >
              התחל עכשיו
            </Button>
          )}
        </Box>
  
        {user.name && (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              gap: 3,
              mb: 6,
            }}
          >
            {[ // רשימת הכרטיסים
              {
                icon: <CreateIcon sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />,
                title: "צור פרומפט חדש",
                description: "בחר קטגוריה ותת-קטגוריה, כתוב הנחיה וקבל שיעור מותאם אישית",
                button: (
                  <Button variant="contained" component={Link} to="/createPrompt" startIcon={<CreateIcon sx={{ ml: 1 }}/>}>
                    צור פרומפט
                  </Button>
                ),
              },
              {
                icon: <HistoryIcon sx={{ fontSize: 48, color: "secondary.main", mb: 2 }} />,
                title: "היסטוריית למידה",
                description: "צפה בכל השיעורים שקיבלת, חזור על חומרים ועקוב אחר ההתקדמות",
                button: (
                  <Button variant="outlined" component={Link} to="/history" startIcon={<HistoryIcon sx={{ ml: 1 }}/>}>
                    צפה בהיסטוריה
                  </Button>
                ),
              },
              {
                icon: <SchoolIcon sx={{ fontSize: 48, color: "success.main", mb: 2 }} />,
                title: "למידה חכמה",
                description: "השתמש בכוח הבינה המלאכותית כדי לקבל הסברים מותאמים לרמתך",
                button: (
                  <Button variant="text" component={Link} to="/createPrompt" startIcon={<SchoolIcon sx={{ ml: 1 }}/>}>
                    למד עכשיו
                  </Button>
                ),
              },
            ].map((card, index) => (
              <Box
                key={index}
                sx={{
                  flex: "1 1 calc(33.333% - 20px)",
                  minWidth: 260,
                  maxWidth: "100%",
                }}
              >
                <Card
                  elevation={3}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.2s",
                    "&:hover": { transform: "translateY(-4px)" },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
                    {card.icon}
                    <Typography variant="h5" component="h2" gutterBottom>
                      {card.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {card.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "center", pb: 2 }}>{card.button}</CardActions>
                </Card>
              </Box>
            ))}
          </Box>
        )}
  
        <Paper
          elevation={2}
          sx={{
            p: 4,
            textAlign: "center",
            bgcolor: "primary.light",
            color: "white",
            marginTop:'70px'
          }}
        >
          <Typography variant="h5" gutterBottom>
            למידה מותאמת אישית עם AI
          </Typography>
          <Typography variant="body1">
            הפלטפורמה שלנו משתמשת בטכנולוגיות בינה מלאכותית מתקדמות כדי ליצור עבורך חוויית למידה ייחודית ומותאמת אישית
          </Typography>
        </Paper>
      </Container>
    )
  }
  
  export default HomePage
  