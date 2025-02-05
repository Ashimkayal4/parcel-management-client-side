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

## Run Locally

Clone the project

```bash
  git clone https://github.com/Ashimkayal4/parcel-management-client-side.git
```

Go to the project directory

```bash
  cd parcel-management-client-side
```

Install dependencies

```bash
  npm install
```
## Environment Variables
To run this project, you will need to add the following environment variables to your .env file
VITE_apiKey
VITE_authDomain
VITE_projectId
VITE_storageBucket
VITE_messagingSenderId
VITE_appId
VITE_stripe_key
VITE_IMAGE_HOSTING_KEY

Start the server

```bash
  npm run dev
```



