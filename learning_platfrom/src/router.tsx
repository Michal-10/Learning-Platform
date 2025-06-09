// import { createBrowserRouter } from "react-router";

// export const Router = createBrowserRouter([

// ])

import { createBrowserRouter, Navigate } from "react-router";
import Layout from "./Layout";
// import Register from "./components/Register";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import PromptHistory from "./components/PromptHistory";
import AdminDashboard from "./components/AdminDashboard";
import PromptCreation from "./components/PromptCreation";

export const Router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "", element: <Navigate to="/HomePage" /> }, // הפניה אוטומטית
            { path: "HomePage", element: <HomePage /> },
            { path: "login", element: <Login /> },
            // { path: "register", element: <Register /> },
            {
                path: "createPrompt",
                element: (
                    //   <ProtectedRoute>
                    <PromptCreation />
                    //    </ProtectedRoute>/}
                ),
            },
            {
                path: "history",
                element: (
                    //   <ProtectedRoute>
                    <PromptHistory />
                    //   </ProtectedRoute>
                ),
            },
            {
                path: "admin",
                element: (
                    //   <AdminRoute>
                    <AdminDashboard />
                    //   </AdminRoute>
                ),
            },
        ],
    },
]);
