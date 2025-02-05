# DropZone

## Overview

Parcel Delivery System is a robust web application designed to manage the parcel booking and delivery process. The application supports multiple user roles, including regular users, delivery men, and admins, with features that allow users to book parcels, track deliveries, and leave reviews. Admins can manage all users, parcels, and delivery men through an intuitive dashboard, while delivery men can manage and track their assigned parcels.

 <p><img src="https://i.ibb.co.com/DgRLrNL1/Screenshot-124.png"/></p>

## Features

- **User Authentication**: Register and log in using email and password or social login (default user type: User).
- **Parcel Booking**: Users can book parcels, with prices calculated based on parcel weight.
- **Parcel Management**: Users can view their booked parcels, update them, cancel them, or leave a review if delivered.
- **Delivery Men Dashboard**: Delivery men can view and manage their assigned parcels, update status, and view reviews.
- **Admin Dashboard**: Admins can manage all parcels, users, delivery men, and see app usage statistics via charts.
- **Statistics & Charts**: Admin dashboard displays app usage through bar and line charts.
- **Location Tracking**: View parcel delivery locations on a map.
- **Stripe Integration**: Users can pay for parcels via Stripe, with a confetti explosion on successful payments.
- **Light/Dark Mode**: Toggle between light and dark themes.
- **JWT Authentication**: Secure authentication for protected routes.
- **Responsive Design**: Fully responsive, works seamlessly on all devices.
- **Social Login**: Use Google login for fast registration and login.

- **Live side URL**: https://assignment-twelve-16476.web.app/

## Technologies Used

- **Frontend**: React, Tailwind CSS, DaisyUI, React Router, React Hook Forms
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT, Firebase (for storing profile images)
- **Payment System**: Stripe
- **Charts**: React Apex Charts
- **Maps**: React MapGL or React Leaflet

## Dependencies
  "dependencies": {
    "@stripe/react-stripe-js": "^3.1.1",
    "@stripe/stripe-js": "^5.5.0",
    "@tanstack/react-query": "^5.64.1",
    "axios": "^1.7.9",
    "firebase": "^11.1.0",
    "localforage": "^1.10.0",
    "lottie-react": "^2.4.0",
    "match-sorter": "^8.0.0",
    "react": "^18.3.1",
    "react-apexcharts": "^1.7.0",
    "react-confetti-explosion": "^2.1.2",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.54.2",
    "react-icons": "^5.4.0",
    "react-router-dom": "^7.1.1",
    "sort-by": "^1.2.0",
    "sweetalert2": "^11.15.10"
  }

## Step-by-Step Guide to Run Locally
**1.Clone the repository:**
  git clone https://github.com/Ashimkayal4/parcel-management-client-side.git
  cd parcel-management-client-side

**2.Install dependencies:**
  npm install

**3.Set up environment variables:** Create a .env file in the root directory and configure the following:
REACT_APP_FIREBASE_API_KEY
REACT_APP_STRIPE_PUBLIC_KEY

**4.Run the application:**
  npm run dev



