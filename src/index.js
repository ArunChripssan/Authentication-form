import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Profile from "./components/Profile";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginForm />,
    },
    {
        path: "/Signup",
        element: <SignupForm />,
    },
    {
        path: "/profile",
        element: <Profile />,
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <RouterProvider router={router} />
);
