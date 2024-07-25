import React from "react";
import { useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import LoginPage from "./src/pages/loginPage";
import SignupPage from "./src/pages/signupPage";
import HomePage from "./src/pages/homePage";
import OtpPage from "./src/pages/otpPage";
import WebsitePage from "./src/pages/websitePage";
import { useSelector } from "react-redux";

const AppRouter = () => {
    const { isAuthorized, isEmailVerified } = useSelector((e) => e.auth);
    // const isAuthorized=true;
    // const isEmailVerified=true
    console.log(isEmailVerified);

    const router = createBrowserRouter([
        {
            path: "/storify",
            element: isAuthorized ? <>{
                isEmailVerified ? <HomePage /> : <Navigate to="/otp" />
            }</>
                : <Navigate to="/" />,
        },
        {
            path: "/",
            element: isAuthorized ? <Navigate to="/storify" /> : <WebsitePage />,
        },
        {
            path: "/login",
            element: isAuthorized ? <Navigate to="/storify" /> : <LoginPage />,
        },
        {
            path: "/signup",
            element: isAuthorized ? <Navigate to="/storify" /> : <SignupPage />,
        },
        {
            path: "/otp",
            element: isAuthorized && !isEmailVerified ? <OtpPage /> : <Navigate to="/storify" />,
        },



    ]);
    return <RouterProvider router={router} />

};

export default AppRouter;