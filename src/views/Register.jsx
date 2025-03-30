import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import LoadingBar from "../utils/LoadingBar";
import useTitle from "../utils/useTitle";
import { useToast } from "../utils/useToast";

function Register() {
  useTitle("Register an account | WeAsk");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [sending, setSending] = useState(false);

  const { registerUser } = useContext(AuthContext);
  const { toastError } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === password2) {
      registerUser(email, username, password, password2);
    } else {
      toastError("The passwords does not match.");
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
                <p>Gain more knowledge. </p>
                <p>Share ideas.</p>
              </h5>
            </div>
          </div>

          <div className="login-content col col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
            <div id="particles-js"></div>
            <div id="login-account-form">
              <div className="container-fluid d-flex align-center justify-center login-form-container login-form-mobile">
                <div className="form-title text-center">Create an account.</div>

                <div className="login-form">
                  <form autoComplete="off" onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                      <input
                        id="full-name"
                        type="text"
                        className="form-control"
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Full name"
                        required
                      />
                      <label htmlFor="full-name">Full Name</label>
                    </div>

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
                        id="email"
                        type="email"
                        className="form-control"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="E-mail"
                        required
                      />
                      <label htmlFor="email">E-mail</label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        id="password"
                        type="password"
                        className="form-control"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                      />
                      <label htmlFor="password">Password</label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        id="confirm-password"
                        type="password"
                        className="form-control"
                        onChange={(e) => setPassword2(e.target.value)}
                        placeholder="Confirm password"
                        required
                      />
                      <label htmlFor="confirm-password">Confirm Password</label>
                    </div>

                    <button
                      type="submit"
                      className="login-button-full"
                      disabled={sending}
                    >
                      {sending ? "Registering..." : "Register"}
                    </button>
                  </form>
                  <Link className="login-button-outline" to="/login">
                    Back to login
                  </Link>
                </div>
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

export default Register;
