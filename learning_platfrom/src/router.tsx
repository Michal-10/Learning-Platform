
import { createBrowserRouter, Navigate } from "react-router";
import Layout from "./Layout";
import HomePage from "./components/HomePage";
import PromptHistory from "./components/PromptHistory";
import AdminDashboard from "./components/AdminDashboard";
import PromptCreation from "./components/PromptCreation";
import LoginRegister from "./components/LoginRegister";

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
