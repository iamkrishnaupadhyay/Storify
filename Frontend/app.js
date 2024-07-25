import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import LoginPage from "./src/pages/loginPage";
import SignupPage from "./src/pages/signupPage";
import HomePage from "./src/pages/homePage";
import { Provider, useSelector } from "react-redux";
import appStore from "./src/store/appStore"
import AppRouter from "./appRouter";
import "./globalStyles.css";
import { ToastContainer } from 'react-toastify';


const App = () => {
    return (
        <Provider store={appStore}>
            <AppRouter />
            <ToastContainer />
        </Provider>
    )
};

const parent = document.getElementById("root");
const root = ReactDOM.createRoot(parent);
root.render(App());