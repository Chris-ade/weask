import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

import "./static/css/main.css";
import "./static/css/main-2.css";
import "./static/css/bootstrap.css";
import "./static/css/tailwind.css";

import Landing from "./views/Landing";
import Register from "./views/Register";
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            path="/dashboard"
            element={<PrivateRoute component={Dashboard} />}
            exact
          />
          <Route element={<Login />} path="/login" />
          <Route element={<Register />} path="/register" exact />
          <Route element={<Landing />} path="/" exact />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
