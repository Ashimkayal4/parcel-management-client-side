import {
    createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import Home from "../pages/HomePage/Home";
import Dashboard from "../layouts/Dashboard/Dashboard";
import BookParcel from "../pages/DashboardPage/userHome/BookParcel";
import MyBookedParcel from "../pages/DashboardPage/userHome/MyBookedParcel";
import MyProfile from "../pages/DashboardPage/userHome/MyProfile";
import MyReviews from "../pages/DashboardPage/daliveryManHome/MyReviews";
import MyDeliveryList from "../pages/DashboardPage/daliveryManHome/MyDeliveryList";
import Statistic from "../pages/DashboardPage/adminHome/Statistic";
import AllParcel from "../pages/DashboardPage/adminHome/AllParcel";
import AllDeliveryMen from "../pages/DashboardPage/adminHome/AllDeliveryMen";
import AllUsers from "../pages/DashboardPage/adminHome/AllUsers";



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
        
            // users links
            {
                path: '/dashboard/usersHome/bookParcel',
                element: <BookParcel></BookParcel>
            },
            {
                path: '/dashboard/usersHome/myParcel',
                element:<MyBookedParcel></MyBookedParcel>
            },
            {
                path: '/dashboard/usersHome/myProfile',
                element:<MyProfile></MyProfile>
            },

            // delivery man related links

            {
                path: '/dashboard/deliveryHome/myReviews',
                element:<MyReviews></MyReviews>
            },
            {
                path: '/dashboard/deliverHome/myDeliveryList',
                element:<MyDeliveryList></MyDeliveryList>
            },

            // admin related links
            {
                path: '/dashboard/adminHome/statistic',
                element:<Statistic></Statistic>
            },
            {
                path: '/dashboard/adminHome/allParcel',
                element: <AllParcel></AllParcel>
            },
            {
                path: '/dashboard/AdminHome/allDeliveryMan',
                element:<AllDeliveryMen></AllDeliveryMen>
            },
            {
                path: '/dashboard/adminHome/allUsers',
                element:<AllUsers></AllUsers>
            }
        ]
    }
]);