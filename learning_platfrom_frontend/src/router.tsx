
import { createBrowserRouter, Navigate } from "react-router";
import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import PromptHistory from "./pages/PromptHistory";
import AdminDashboard from "./pages/AdminDashboard";
import PromptCreation from "./pages/PromptCreation";
import LoginRegister from "./pages/LoginRegister";

export const Router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "", element: <Navigate to="/HomePage" /> }, // הפניה אוטומטית
            { path: "HomePage", element: <HomePage /> },
            { path: "eneterToSystem", element: <LoginRegister /> },
            {
                path: "createPrompt",
                element: (
                    <PromptCreation />
                ),
            },
            {
                path: "history",
                element: (
                    <PromptHistory />
                ),
            },
            {
                path: "admin",
                element: (
                    <AdminDashboard />
                ),
            },
        ],
    },
]);
