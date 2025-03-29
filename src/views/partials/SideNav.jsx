import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const SideNav = () => {
  const baseURL = import.meta.env.VITE_API_URL;
  const { user } = useContext(AuthContext);

  return (
    <>
      <section>
        <div className="is-sidebar is-hidden-mobile flex items-center p-10 space-x-6">
          <div className="flex flex-col items-center w-40 h-full overflow-hidden">
            <Link
              className="flex items-center w-full px-3 mt-3 brand-icon"
              to="/home"
            >
              <svg viewBox="0 0 20 20">
                <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
              </svg>
              <h4 className="ml-2 brand-logo">
                <sup>We</sup>Ask
              </h4>
            </Link>
            <div className="w-full px-2 overflow-y no-scrollbar">
              <div className="is-item-wrapper">
                <Link className="is-item is-active no-stroke" to="/home">
                  <svg
                    role="img"
                    className="icon w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    aria-labelledby="home"
                  >
                    <title id="home">Home</title>
                    <path d="M3 10.182V22h18V10.182L12 2z"></path>
                    <rect
                      width="6"
                      height="8"
                      x="9"
                      y="14"
                      fill="#fff"
                      stroke=""
                    ></rect>
                  </svg>
                  <span className="ml-2 font-medium">Home</span>
                </Link>
                <Link className="is-item" to="/explore">
                  <svg
                    className="icon w-6 h-6"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <polygon points="14.121 14.121 7.05 16.95 9.879 9.879 16.95 7.05"></polygon>
                    <circle cx="12" cy="12" r="10"></circle>
                  </svg>
                  <span className="ml-2 font-medium">Explore</span>
                </Link>
                <Link className="is-item" to="/search">
                  <svg
                    className="icon w-6 h-6"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    aria-labelledby="search"
                  >
                    <title id="search">Search</title>
                    <path d="M14.4121122,14.4121122 L20,20"></path>
                    <circle cx="10" cy="10" r="6"></circle>
                  </svg>
                  <span className="ml-2 text-sm font-medium">Search</span>
                </Link>
                <Link className="is-item" to="/logout">
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    aria-labelledby="logout"
                    className="icon w-6 h-6"
                  >
                    <title id="logout">Logout</title>
                    <path d="M18 15l3-3-3-3"></path>
                    <path d="M11.5 12H20"></path>
                    <path stroke-linecap="round" d="M21 12h-1"></path>
                    <path d="M15 4v16H4V4z"></path>
                  </svg>
                  <span className="ml-2 text-sm font-medium">Logout</span>
                </Link>
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
                <Link className="is-item is-active no-stroke" to="/home">
                  <svg
                    role="img"
                    className="icon w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 10.182V22h18V10.182L12 2z"></path>
                    <rect width="6" height="8" x="9" y="14"></rect>
                  </svg>
                </Link>
                <Link className="is-item" to="/explore">
                  <svg
                    className="icon w-6 h-6"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <polygon points="14.121 14.121 7.05 16.95 9.879 9.879 16.95 7.05"></polygon>
                    <circle cx="12" cy="12" r="10"></circle>
                  </svg>
                </Link>
                <Link className="is-item is-item-create" to="/ask">
                  <div>
                    <span>
                      <svg
                        className="icon icon--24"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M17 12L7 12M12 17L12 7"
                          stroke="#009B77"
                        ></path>
                        <circle cx="12" cy="12" r="10"></circle>
                      </svg>
                    </span>
                  </div>
                </Link>
                <Link className="is-item overlay"></Link>
                <Link className="is-item" to="/search">
                  <svg
                    className="icon w-6 h-6"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.4121122,14.4121122 L20,20"></path>
                    <circle cx="10" cy="10" r="6"></circle>
                  </svg>
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
