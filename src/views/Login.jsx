import React, { useContext, useState, useRef } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import LoadingBar from "../utils/LoadingBar";
import useTitle from "../utils/useTitle";

function Login() {
  useTitle("Login | WeAsk");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [sending, setSending] = useState(false);
  const passwordField = useRef();
  const { loginUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.length > 0 && password.length > 0) {
      try {
        setSending(true);
        await loginUser(username, password);
      } catch (e) {
        setSending(false);
      } finally {
        setSending(false);
      }
    }
  };

  const handleFieldToggle = (e) => {
    const field = passwordField.current;

    if (field.type === "password") {
      field.type = "text";
    } else {
      field.type = "password";
    }
  };

  return (
    <>
      <LoadingBar />
      <div className="login-wrapper">
        <div className="login-container row display-flex">
          <div className="login-sidebar col col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
            <div className="login-sidebar-content p-3">
              <p className="font-bold text-3xl py-3">
                <sup>We</sup>Ask
              </p>
              <h5 className="h5 space-y-2">
                <p>Get real answers to questions. </p>
                <p>Acquire more knowledge. </p>
                <p>Share ideas.</p>
              </h5>
            </div>
          </div>

          <div className="login-content col col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
            <div id="particles-js"></div>
            <div id="login-account-form">
              <div className="container-fluid d-flex align-center justify-center login-form-container login-form-mobile">
                <div className="form-title text-center">
                  Welcome back, log in
                </div>

                <form autoComplete="off" onSubmit={handleSubmit}>
                  <div className="login-form">
                    <div className="form-floating mb-3">
                      <input
                        id="username"
                        type="text"
                        className="form-control"
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        required
                      />
                      <label htmlFor="username">Username</label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        ref={passwordField}
                        required
                      />
                      <label htmlFor="password">Password</label>
                      <div
                        id="toggle-password"
                        className="button"
                        onClick={(e) => handleFieldToggle(e)}
                      >
                        <i className="far fa-eye"></i>
                      </div>
                    </div>

                    <button
                      className="login-button-full"
                      type="submit"
                      style={{ fontWeight: 600 }}
                      disabled={sending}
                    >
                      {sending ? "Logging in..." : "Login"}
                    </button>
                  </div>
                </form>
                <Link className="login-button-outline" to="/register">
                  Create an account
                </Link>
              </div>
            </div>
          </div>
        </div>
        <footer className="is-footer pb-4">
          <p>
            &copy; 2022 - Chris Adebiyi |{" "}
            <a href="https://chrisdev-bay.vercel.app" target="_blank">
              PORTFOLIO
            </a>
          </p>
        </footer>
      </div>
    </>
  );
}

export default Login;
