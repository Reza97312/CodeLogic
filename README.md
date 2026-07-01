#  CodeLogic — Modern Educational Platform

[![React](https://img.shields.io/badge/React-19.1-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![React Query](https://img.shields.io/badge/React_Query-5.90-FF4154?logo=react-query&logoColor=white)](https://tanstack.com/query/latest)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.10-764ABC?logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.2-0055FF?logo=framer&logoColor=white)](https://www.framer.com/motion/)

CodeLogic is a high-performance, fully responsive frontend application designed for modern educational platforms. Built with React and Vite, it delivers a seamless user experience through fluid animations, robust state management, and a rich feature set tailored for students and instructors.

Live Demo: [CodeLogic on Netlify](https://codelogic-project.netlify.app/)


##  Key Features

-  AI Chatbot Integration: Intelligent virtual assistant to guide users and answer queries in real-time.
-  Bilingual Support (i18n): Fully localized interface supporting both English (LTR) and Persian (RTL) seamlessly.
-  Dark/Light Mode: Aesthetic and accessible theme switching for optimal viewing in any environment.
-  Fluid Animations: Engaging UI interactions powered by framer-motion and lottie-react.
-  Advanced Data Handling: Efficient server-state management, caching, and data fetching using @tanstack/react-query and axios.
-  Robust Form Validation: Secure and dynamic forms built with formik and yup.
-  Fully Responsive: Mobile-first approach ensuring flawless UI across all devices.


##  Tech Stack & Libraries

- Core Framework: React 19, Vite
- Styling & UI: Tailwind CSS v4, Material UI (MUI), Emotion
- State Management: Redux Toolkit (Client State), React Query (Server State)
- Routing: React Router v7
- Internationalization: i18next, react-i18next
- Animations: Framer Motion, Lottie React, React Parallax Tilt
- Forms & Validation: Formik, Yup
- Map Integration: Leaflet, React Leaflet
- Utilities: Lodash, React Date Object, React Paginate, React Toastify


##  Application Architecture (Pages)

The platform includes a comprehensive suite of pages to manage the entire educational flow:

- Landing / Home - Engaging entry point with dynamic overviews.
- Authentication - Secure login and registration flows.
- User Panel - Personalized dashboard for students/users.
- Course List & Detail - Browse available courses and view in-depth syllabus info.
- Course Comparison - Side-by-side analysis of multiple courses.
- Teacher Profiles - Detailed instructor credentials and course history.
- News & News Detail - Tech and platform updates/blog.
- Payment - Seamless checkout and transaction handling.
- Contact Us - Interactive maps and communication forms.


## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

Before getting started, make sure you have the following installed:

- Node.js (v18 or later recommended)
- npm, Yarn, or pnpm

### 1. Clone the Repository

```bash
git clone https://github.com/Reza97312/CodeLogic.git
cd CodeLogic
```

### 2. Install Dependencies

Using npm:

```bash
npm install
```

Or using Yarn:

```bash
yarn install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root and add the following variable:

```env
REACT_APP_PUBLIC_PATH=http://react.genzuni.website
```

> Note: If you migrate this project to Vite in the future, consider renaming environment variables to use the VITE_ prefix.

### 4. Run the Development Server

Using npm:

```bash
npm run dev
```

Or using Yarn:

```bash
yarn dev
```

The application will be available at:

```text
http://localhost:5173
```

## Build for Production

To generate an optimized production build, run:

```bash
npm run build
```
