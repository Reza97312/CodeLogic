import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../../components/layouts/Layout";
import Landing from "../../pages/Landing/Landing";
import CourseList from "../../pages/CourseList/CourseList";
import StepOne from "../../pages/auth/Register/StepOne";
import StepTwo from "../../pages/auth/Register/StepTwo";
import StepThree from "../../pages/auth/Register/StepThree";
import NewsDetails from "../../pages/NewsDetails/NewsDetails";
import LoginPage from "../../pages/auth/Login/LoginPage";
import LoginValidationPage from "../../pages/auth/Login/LoginValidationPage";
import ForgotPasswordStepOne from "../../pages/auth/forgotPassword/forgotPasswordStepOne";
import ForgotPasswordStepTwo from "../../pages/auth/forgotPassword/ForgotPasswordStepTwo";
import CourseDetail from "../../pages/CourseDetail/CourseDetail";
import TeachersPage from "../../pages/Teachers/TeachersPage/TeachersPage";
import TeachersDetail from "../../pages/Teachers/TeachersDetail/TeachersDetail";
import Panel from "../../pages/UserPanel/UserPanel";
import PanelDashboard from "../../pages/UserPanel/UserPanelDashboard";
import PanelUserInfo from "../../pages/UserPanel/UserPanelUserInfo";
import MyCourses from "../../pages/UserPanel/MyCourses/MyCourses";
import MyReservedCourses from "../../pages/UserPanel/MyReservedCourses/MyReservedCourses";
import MyCourseComments from "../../pages/UserPanel/MyCourseComments/MyCourseComments";
import MyNewsComments from "../../pages/UserPanel/MyNewsComments/MyNewsComments";
import CoursesPayment from "../../pages/UserPanel/CoursesPayment/CoursesPayment";
import FavoriteNews from "../../pages/UserPanel/FavoriteNews/FavoriteNews";
import FavoriteCourses from "../../pages/UserPanel/FavoriteCourses/FavoriteCourses";
import SecuritySettings from "../../pages/UserPanel/securitySettings/SecuritySettings";
import NewsPage from "../../pages/NewsPage/NewsPage";
import NotFound from "../../pages/NotFound/NotFound";
import PaymentRedirectPage from "../../pages/paymentRedirect/PaymentRedirectPage";
import Comparison from "../../pages/Comparison/Comparison";
import ContactUs from "../../pages/ContactUs/ContactUs";

import UserPanelNotifications from "../../pages/UserPanel/UserPanelNotifications";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Landing /> },
      { path: "/courseList", element: <CourseList /> },
      { path: "/courseDetail/:id", element: <CourseDetail /> },
      { path: "/news", element: <NewsPage /> },
      { path: "/teachers", element: <TeachersPage /> },
      { path: "/teacher/:id", element: <TeachersDetail /> },
      { path: "/news/:id", element: <NewsDetails /> },
      { path: "/redirect/", element: <PaymentRedirectPage /> },
      { path: "/comparison", element: <Comparison /> },
      { path: "/contactUs", element: <ContactUs /> },
    ],
  },
  {
    path: "/userPanel",
    element: <Panel />,
    children: [
      { index: true, element: <PanelDashboard /> },
      { path: "userInfo", element: <PanelUserInfo /> },
      { path: "myCourses", element: <MyCourses /> },
      { path: "myReservedCourses", element: <MyReservedCourses /> },
      { path: "myCourseComments", element: <MyCourseComments /> },
      { path: "myNewsComments", element: <MyNewsComments /> },
      { path: "coursesPayments", element: <CoursesPayment /> },
      { path: "favoriteNews", element: <FavoriteNews /> },
      { path: "favoriteCourses", element: <FavoriteCourses /> },
      { path: "securitySettings", element: <SecuritySettings /> },
      { path: "notifications", element: <UserPanelNotifications /> },
    ],
  },
  { path: "/registerStepOne", element: <StepOne /> },
  { path: "/registerStepTwo", element: <StepTwo /> },
  { path: "/registerStepThree", element: <StepThree /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/loginValidation", element: <LoginValidationPage /> },
  { path: "/forgotPassOne", element: <ForgotPasswordStepOne /> },
  { path: "/forgotPassTwo/:id", element: <ForgotPasswordStepTwo /> },
  { path: "*", element: <NotFound /> },
]);

export default router;
