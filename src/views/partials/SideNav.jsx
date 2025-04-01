import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const SideNav = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <>
      <section>
        <div className="is-sidebar is-hidden-mobile flex items-center p-10 space-x-6">
          <div className="flex flex-col items-center w-40 h-full overflow-hidden">
            <Link className="flex items-center mt-4 brand-icon" to="/home">
              <i className="far fa-messages-question"></i>
              <h4 className="ml-2 brand-logo">
                <sup>We</sup>Ask
              </h4>
            </Link>
            <div className="w-full px-2 overflow-y no-scrollbar">
              <div className="is-item-wrapper">
                <Link className="is-item is-active no-stroke" to="/home">
                  <i className="far fa-house"></i>
                  <span className="ml-2 font-medium">Home</span>
                </Link>
                <Link className="is-item" to="/explore">
                  <i className="far fa-compass"></i>
                  <span className="ml-2 font-medium">Explore</span>
                </Link>
                <Link className="is-item" to="/search">
                  <i className="far fa-search"></i>
                  <span className="ml-2 text-sm font-medium">Search</span>
                </Link>
                <a
                  className="is-item cursor-pointer"
                  onClick={() => logoutUser()}
                >
                  <i className="far fa-sign-out"></i>
                  <span className="ml-2 text-sm font-medium">Logout</span>
                </a>
              </div>
            </div>
            <Link
              className="is-item-profile"
              to={`/profile/${user.username}/`}
              title={`${user.name} - @${user.username}`}
            >
              <img
                src={`${baseURL}/media/${user.avatar}`}
                className="is-profile-pic"
                alt={`${user.username} avatar`}
              />
              <div className="ml-2 text-sm font-medium is-user-name">
                <h5 className="font-bold text-truncate">{user.name}</h5>
                <span>@{user.username}</span>
              </div>
            </Link>
          </div>
        </div>

        <div className="is-mobile-nav is-hidden-tablet is-hidden-desktop">
          <div className="is-mobile-nav-wrapper">
            <div className="is-item-container">
              <div className="is-item-wrapper">
                <Link className="is-item is-active" to="/home">
                  <i className="far fa-house"></i>
                </Link>
                <Link className="is-item" to="/explore">
                  <i className="far fa-compass"></i>
                </Link>
                <Link className="is-item is-item-create" to="/ask">
                  <div>
                    <span>
                      <i className="far fa-add"></i>
                    </span>
                  </div>
                </Link>
                <Link className="is-item overlay"></Link>
                <Link className="is-item" to="/search">
                  <i className="far fa-search"></i>
                </Link>
                <Link
                  className="is-item is-item-profile"
                  to={`/profile/${user.username}`}
                >
                  <img
                    src={`${baseURL}/media/${user.avatar}`}
                    alt={`${user.username} avatar`}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SideNav;
