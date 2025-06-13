import { createBrowserRouter, RouterProvider } from "react-router";

import React from "react";
import ReactDOM from "react-dom/client";
import Root from "../Pages/Root";
import Home from "../Pages/Home";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import AllCourses from "../Pages/Courses/AllCourses";
import CourseForm from "../Pages/Courses/CourseForm";
import PrivateRoute from "./PrivateRoute";
import MyCourse from "../Pages/Courses/MyCourse";
import ErrorPage from "../Pages/ErrorPage";
import CourseEdit from "../Pages/Courses/CourseEdit";
import EnrolledCourse from "../Pages/Courses/EnrolledCourse";

export const router = createBrowserRouter([
  {
    path: "/",
    
    Component: Root,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      { index: true,loader: () => fetch("https://course-server-beta-three.vercel.app/allenroll"), Component: Home },
      {
        path: "/courses",
        loader: async () => {
          const response = await fetch("https://course-server-beta-three.vercel.app/allcoffee");
          if (!response.ok) {
            throw new Error("Failed to load user data");
          }
          return response.json();
        },
        Component: AllCourses,
      },
      {
        path: "/add-course",
        element: (
          <PrivateRoute>
            <CourseForm />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-course",
        loader: async () => {
          const response = await fetch("https://course-server-beta-three.vercel.app/allcoffee");
          if (!response.ok) {
            throw new Error("Failed to load user data");
          }
          return response.json();
        },
        element: (
          <PrivateRoute>
            <MyCourse />
          </PrivateRoute>
        ),
      },
      {
        path: "edit/:id",
        loader: ({ params }) =>
          fetch(`https://course-server-beta-three.vercel.app/course/${params.id}`),
        element: (
          <PrivateRoute>
            <CourseEdit />
          </PrivateRoute>
        ),
      },
      {
        path: "enrolled-course",
        loader: async () => {
          const response = await fetch("https://course-server-beta-three.vercel.app/allenroll");
          if (!response.ok) {
            throw new Error("Failed to load user data");
          }
          return response.json();
        },
        element: (
          <PrivateRoute>
            <EnrolledCourse />
          </PrivateRoute>
        )
      }
    ],
  },
  {
    path: "/register",
    errorElement: <ErrorPage></ErrorPage>,
    Component: Register,
  },
  {
    path: "/login",
    errorElement: <ErrorPage></ErrorPage>,
    Component: Login,
  },
]);




