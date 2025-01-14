import {
    createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import Home from "../pages/HomePage/Home";
import Dashboard from "../layouts/Dashboard/Dashboard";
import BookParcel from "../pages/DashboardPage/BookParcel";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element:<Home></Home>
            },
            {
                path: '/login',
                element:<Login></Login>
            },
            {
                path: '/register',
                element:<Register></Register>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: '/dashboard/bookParcel',
                element:<BookParcel></BookParcel>
            }
        ]
    }
]);