import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import { SnackbarProvider } from "notistack";

import "./static/css/all.min.css";
import "./static/css/Bootstrap.css";
import "./static/css/App.css";
import "./static/css/Pry.css";
import "./static/css/Tailwind.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

import Register from "./views/Register";
import Login from "./views/Login";
import NoPage from "./views/NoPage";
import Explore from "./views/Explore";
import ViewQuestions from "./views/ViewQuestions";
import Profile from "./views/Profile";
import Settings from "./views/Settings";
import Question from "./views/Question";
import Search from "./views/Search";
import Home from "./views/Home";
import AskQuestion from "./views/AskQuestion";

function App() {
  return (
    <SnackbarProvider>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/category/:slug" element={<ViewQuestions />} />
              <Route path="/ask" element={<AskQuestion />} />
              <Route path="/question/:slug/:id" element={<Question />} />
              <Route path="/profile/:username" element={<Profile />} />
              <Route path="/search" element={<Search />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
            <Route path="*" element={<NoPage />} />
          </Routes>
        </AuthProvider>
      </Router>
    </SnackbarProvider>
  );
}

export default App;
