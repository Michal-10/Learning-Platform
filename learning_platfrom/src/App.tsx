
import React from "react";
import store from "./states/store";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router";
import { Router } from "./router";

const App: React.FC = () => {
  return (
    // <Router>
    //   <Header />
      // <ThemeProvider theme={theme}>
        <Provider store={store}>
          <RouterProvider router={Router} />
        </Provider>
      
  );
};

export default App;
