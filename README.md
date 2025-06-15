# 🌟 AI Learning Platform – Mini MVP

פלטפורמת למידה אינטראקטיבית מונחית בינה מלאכותית, שבה המשתמשים יכולים לבחור תחום לימוד, לשלוח הנחיות, לקבל שיעורים מותאמים ולצפות בהיסטוריית הלמידה שלהם דרך לוח מחוונים נוח וברור.

🔗 **Live App:** [https://enchanting-pegasus-376666.netlify.app](https://enchanting-pegasus-376666.netlify.app)

---

## ✨ תכונות מרכזיות

* 🔐 התחברות והרשמה עם JWT
* 📚 בחירת קטגוריה ותת־קטגוריה
* 💬 שליחת Prompt וקבלת שיעור מותאם מ-GPT
* 🧾 צפייה בהיסטוריית הנחיות אישית
* 🧑‍💼 לוח ניהול עם רשימת משתמשים ונתונים

---

## 🧰 טכנולוגיות

| תחום             | טכנולוגיה                            |
| ---------------- | ------------------------------------ |
| 🧠 בינה מלאכותית | OpenAI GPT API                       |
| 🧱 Backend       | Node.js, Express, TypeScript         |
| 🗂️ Database     | MongoDB עם Mongoose                  |
| 🌐 Frontend      | React, TypeScript, Vite, Material UI |
| 🔒 אימות         | JWT + Middleware                     |
| ⚙️ Dev Tools     | Docker, dotenv, Netlify, Render      |

---

## 🗂️ מבנה פרויקט

### 🟨 Frontend – `client/`

```
client/
├── src/
│   ├── assets/               
│   ├── models/               
│   ├── pages/                
│   ├── states/               
│   ├── App.tsx               
│   └── main.tsx
│   └── Layout.tsx          
├── public/                  
├── vite.config.ts
└── package.json
```

### 🟧 Backend – `server/`

```
server/
├── controllers/     
├── routes/
├── models/  
├── middleware/ 
├── services/ 
├── utils/                
└── server.ts   
```

---

## 🛠️ התקנה והרצה מקומית

### 🔧 Backend

```bash
cd server
npm install
npm start
```

### 💻 Frontend

```bash
cd client
npm install
npm run dev
```

---

## 🔐 קובץ `.env` (Backend)

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/
JWT_SECRET=supersecret
OPENAI_API_KEY=your_openai_key
```

---

## 🧮 מודלים במסד הנתונים

* `User`: id, name, phone
* `Category`: id, name
* `SubCategory`: id, name, category\_id
* `Prompt`: id, user\_id, category\_id, sub\_category\_id, prompt, response, created\_at

---

## 🔗 קוד מקור

📁 GitHub Repository: [https://github.com/Michal-10/Learning-Platform](https://github.com/Michal-10/Learning-Platform)

---
## 📞 יצירת קשר
עבור שאלות או הבהרות: michal64934@gmail.com

---

בהצלחה 🎯

