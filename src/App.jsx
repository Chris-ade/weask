import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import AuthContext, { AuthProvider } from "./context/AuthContext";

import "./static/css/App.css";
import "./static/css/App2.css";
import "./static/css/Bootstrap.css";
import "./static/css/Tailwind.css";

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
import Logout from "./views/Logout";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
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
  );
}

export default App;
