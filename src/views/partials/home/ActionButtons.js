import React, { useRef } from "react";
import { Link } from "react-router-dom";

function ActionButtons() {
  const actionBtn = useRef();

  const handleToggle = (e) => {
    const btn = actionBtn.current;

    if (btn.classList.contains("is-active")) {
      btn.classList.remove("is-active");
    } else {
      btn.classList.add("is-active");
    }
  };

  return (
    <div>
      <div className="ui-create-button is-hidden-mobile is-hidden-touch-portrait is-visible-desktop">
        <Link to="/ask">
          <svg
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            aria-labelledby="editIconTitle"
            fill="transparent"
          >
            <title id="editIconTitle">Ask a question</title>
            <path d="M18.4142136 4.41421356L19.5857864 5.58578644C20.366835 6.36683502 20.366835 7.63316498 19.5857864 8.41421356L8 20 4 20 4 16 15.5857864 4.41421356C16.366835 3.63316498 17.633165 3.63316498 18.4142136 4.41421356zM14 6L18 10"></path>
          </svg>
        </Link>
      </div>

      <div className="fab-wrapper is-hidden-tablet-portrait is-visible-touch-portrait is-hidden-tablet is-hidden-desktop">
        <div className="fab" id="fab" ref={actionBtn} onClick={handleToggle}>
          <span className="fab-dots"></span>
          <span className="fab-dots"></span>
          <span className="fab-dots"></span>
        </div>
        <div className="fab-wheel-wrapper">
          <div className="fab-wheel">
            <Link className="fab-action" to="/settings">
              <svg
                className="icon"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                aria-labelledby="settingsIconTitle"
              >
                <title id="settingsIconTitle">Settings</title>
                <path d="M5.03506429,12.7050339 C5.01187484,12.4731696 5,12.2379716 5,12 C5,11.7620284 5.01187484,11.5268304 5.03506429,11.2949661 L3.20577137,9.23205081 L5.20577137,5.76794919 L7.9069713,6.32070904 C8.28729123,6.0461342 8.69629298,5.80882212 9.12862533,5.61412402 L10,3 L14,3 L14.8713747,5.61412402 C15.303707,5.80882212 15.7127088,6.0461342 16.0930287,6.32070904 L18.7942286,5.76794919 L20.7942286,9.23205081 L18.9649357,11.2949661 C18.9881252,11.5268304 19,11.7620284 19,12 C19,12.2379716 18.9881252,12.4731696 18.9649357,12.7050339 L20.7942286,14.7679492 L18.7942286,18.2320508 L16.0930287,17.679291 C15.7127088,17.9538658 15.303707,18.1911779 14.8713747,18.385876 L14,21 L10,21 L9.12862533,18.385876 C8.69629298,18.1911779 8.28729123,17.9538658 7.9069713,17.679291 L5.20577137,18.2320508 L3.20577137,14.7679492 L5.03506429,12.7050339 Z"></path>
                <circle cx="12" cy="12" r="1"></circle>
              </svg>
            </Link>
            <Link className="fab-action" to="/logout">
              <svg
                role="img"
                viewBox="0 0 24 24"
                aria-labelledby="logout"
                className="icon"
              >
                <title id="logout">Logout</title>
                <path d="M18 15l3-3-3-3"></path>
                <path d="M11.5 12H20"></path>
                <path stroke-linecap="round" d="M21 12h-1"></path>
                <path d="M15 4v16H4V4z"></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActionButtons;
