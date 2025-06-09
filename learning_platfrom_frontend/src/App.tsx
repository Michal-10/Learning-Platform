
// import React from "react";
// import store from "./states/store";
// import { Provider } from "react-redux";
// import { RouterProvider } from "react-router";
// import { Router } from "./router";

// const App: React.FC = () => {
//   return (
//     // <Router>
//     //   <Header />
//       // <ThemeProvider theme={theme}>
//         <Provider store={store}>
//           <RouterProvider router={Router} />
//         </Provider>
      
//   );
// };

// export default App;
import type React from "react"
import store from "./states/store"
import { Provider } from "react-redux"
import { RouterProvider } from "react-router"
import { Router } from "./router"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { rtlTheme } from "./theme"

const App: React.FC = () => {
  return (
    <ThemeProvider theme={rtlTheme}>
      <CssBaseline />
      <Provider store={store}>
        <RouterProvider router={Router} />
      </Provider>
    </ThemeProvider>
  )
}

export default App
