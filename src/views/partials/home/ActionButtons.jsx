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
          <i className="far fa-pen"></i>
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
              <i className="far fa-cog"></i>
            </Link>
            <Link className="fab-action" to="/logout">
              <i className="far fa-sign-out"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActionButtons;
