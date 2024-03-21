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
  const passwordField = useRef();
  const { loginUser } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    username.length > 0 && loginUser(username, password);
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
                    {errorMessage && (
                      <div className="notification-box notification-box-extra notification-box-error">
                        <p>{errorMessage}</p>
                        <div className="notification-close notification-close-error"></div>
                      </div>
                    )}
                    <div className="form-group label-floating">
                      <label className="control-label">Username</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                      <span className="material-input"></span>
                    </div>

                    <div className="form-group label-floating">
                      <label className="control-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        ref={passwordField}
                        required
                      />
                      <div
                        id="toggle-password"
                        className="button"
                        onClick={(e) => handleFieldToggle(e)}
                      >
                        <svg className="icon icon--20" viewBox="0 0 24 24">
                          <path d="M22 12C22 12 19 18 12 18C5 18 2 12 2 12C2 12 5 6 12 6C19 6 22 12 22 12Z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      </div>
                      <span className="material-input"></span>
                    </div>

                    <button
                      className="login-button-full"
                      type="submit"
                      style={{ fontWeight: 600 }}
                    >
                      Sign In
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
      </div>

      <footer id="main-footer" className="add-padding">
        <div className="container">
          <p className="lead">A portfolio project</p>
          <p>
            Powered and coded by
            <span className="font-bold"> Chris Adebiyi</span>. <br /> Made in 🇳🇬
          </p>

          <ul className="footer-links text-center py-4">
            <li>
              <Link to="https://twitter.com/chris_adeh" target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="46"
                  height="46"
                  viewBox="0 0 46 46"
                  role="img"
                  aria-labelledby="twitter-icon"
                >
                  <title id="twitter-icon">Twitter</title>
                  <path d="M31.52 17.716c-.627.278-1.302.466-2.008.55.722-.432 1.275-1.116 1.536-1.933-.676.4-1.422.69-2.22.847-.637-.68-1.546-1.103-2.552-1.103-1.93 0-3.494 1.565-3.494 3.495 0 .273.03.54.09.796-2.904-.146-5.48-1.536-7.205-3.653-.3.52-.473 1.12-.473 1.76 0 1.212.617 2.28 1.555 2.908-.576-.017-1.115-.176-1.587-.436v.043c0 1.694 1.205 3.107 2.805 3.427-.295.082-.603.123-.923.123-.225 0-.444-.02-.657-.062.445 1.388 1.736 2.4 3.266 2.425-1.196.94-2.704 1.498-4.34 1.498-.283 0-.562-.013-.835-.046 1.55.99 3.385 1.568 5.36 1.568 6.43 0 9.944-5.323 9.944-9.94 0-.153-.003-.306-.01-.454.684-.492 1.278-1.108 1.745-1.81" />
                </svg>
              </Link>
            </li>
            <li>
              <Link to="https://instagram.com/chris_adeh" target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="46"
                  height="46"
                  viewBox="0 0 46 46"
                  role="img"
                  aria-labelledby="instagram-icon"
                >
                  <title id="instagram-icon">Instagram</title>
                  <path d="M29.76 29.03v-7.373h-1.537c.152.48.23.975.23 1.49 0 .958-.243 1.838-.73 2.647-.485.807-1.146 1.447-1.98 1.918-.834.47-1.744.705-2.73.705-1.495 0-2.773-.514-3.835-1.543-1.062-1.027-1.593-2.27-1.593-3.726 0-.517.076-1.013.228-1.49H16.21v7.373c0 .2.065.37.2.5.13.14.296.2.494.2H29.07c.188 0 .352-.06.488-.2s.202-.3.202-.49zm-3.233-6.064c0-.94-.343-1.743-1.03-2.406-.686-.664-1.515-.996-2.486-.996-.96 0-1.78.332-2.47.996-.68.663-1.03 1.466-1.03 2.406 0 .942.35 1.743 1.03 2.407s1.51.996 2.48.996c.975 0 1.8-.34 2.49-1s1.03-1.47 1.03-2.41zm3.233-4.097v-1.88c0-.22-.076-.4-.23-.56-.15-.158-.336-.235-.556-.235h-1.98c-.22 0-.406.08-.558.233-.15.155-.228.34-.228.552v1.876c0 .22.076.404.228.556s.337.23.558.23h1.98c.22 0 .406-.078.557-.23.16-.15.23-.338.23-.558zm1.98-2.37v12.99c0 .61-.22 1.14-.66 1.58-.44.44-.967.66-1.582.66H16.502c-.614 0-1.142-.22-1.582-.66-.44-.44-.66-.97-.66-1.586V16.5c0-.614.22-1.142.66-1.582.44-.44.967-.66 1.582-.66h12.996c.615 0 1.14.22 1.582.66.44.44.66.967.66 1.58z" />
                </svg>
              </Link>
            </li>
            <li>
              <Link to="whatsapp://send?phone=2348161201965">
                <svg viewBox="0 0 32 32" role="img">
                  <path
                    d=" M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.817 0 2.15-.515 2.478-1.318.13-.33.244-.73.244-1.088 0-.058 0-.144-.03-.215-.1-.172-2.434-1.39-2.678-1.39zm-2.908 7.593c-1.747 0-3.48-.53-4.942-1.49L7.793 24.41l1.132-3.337a8.955 8.955 0 0 1-1.72-5.272c0-4.955 4.04-8.995 8.997-8.995S25.2 10.845 25.2 15.8c0 4.958-4.04 8.998-8.998 8.998zm0-19.798c-5.96 0-10.8 4.842-10.8 10.8 0 1.964.53 3.898 1.546 5.574L5 27.176l5.974-1.92a10.807 10.807 0 0 0 16.03-9.455c0-5.958-4.842-10.8-10.802-10.8z"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </Link>
            </li>
          </ul>

          <p className="text-center">&copy; 2022 | WeAsk Inc.</p>
        </div>
      </footer>
    </>
  );
}

export default Login;
