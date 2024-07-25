import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./styles.css";
import { GoogleOAuthProvider } from '@react-oauth/google';

import Display from "./Flow2.js"
import Login from "./Flow2.js"
import MainPage from "./Flow2.js"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "app/",
    element: <MainPage />
  }
]);

const root = createRoot(document.getElementById("root"));

// root.render(
//   <StrictMode>

//       <GoogleOAuthProvider clientId="868542149490-i2v3q2mq9ic83bq9jnvjuktqskj1bdoi.apps.googleusercontent.com">


//         <RouterProvider router={router} />


//       </GoogleOAuthProvider>;

//   </StrictMode>
// )

root.render(
  <StrictMode>

      <GoogleOAuthProvider clientId="194316887430-fadv7drjlo5sipco906m7c31jn9423c5.apps.googleusercontent.com">


        <Display />


      </GoogleOAuthProvider>;

  </StrictMode>
)

