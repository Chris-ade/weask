import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import AuthContext, { AuthProvider } from "./context/AuthContext";

import "./static/css/App.css";
import "./static/css/App2.css";
import "./static/css/Bootstrap.css";
import "./static/css/Tailwind.css";

import Landing from "./views/Landing";
import Register from "./views/Register";
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import NoPage from "./views/NoPage";
import Explore from "./views/Explore";
import Profile from "./views/Profile";
import Settings from "./views/Settings";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            path="/dashboard"
            element={<PrivateRoute element={<Dashboard />} />}
            exact
          />
          <Route path="/" element={<Landing />} exact />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} exact />
          <Route path="/explore" element={<Explore />} exact />
          <Route path="/profile/:username" element={<Profile />} exact />
          <Route path="/settings" element={<Settings />} exact />
          <Route path="*" element={<NoPage />} exact />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
