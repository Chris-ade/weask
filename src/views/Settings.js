import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Wrapper from "../views/Wrapper";
import useTitle from "../utils/useTitle";
import useAxios from "../utils/useAxios";
import useUser from "../utils/useUser";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import "../static/css/UIkit.css";
import NoPage from "./NoPage";

const baseURL = "http://localhost:8000/";

function Settings() {
  useTitle("Profile Settings | WeAsk");
  const user = useUser();
  const [userProfile, setUserProfile] = useState("");
  const api = useAxios();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/profile/${user.username}/`);
        {
          response.data.success
            ? setUserProfile(response.data.user)
            : setErrorMessage(response.data.message);
        }
        setBio(response.data.user.bio);
        setLocation(response.data.user.location);
        setLoading(false);
      } catch (error) {
        setUserProfile(null);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.patch(
        `profile/settings/`,
        {
          bio: bio,
          location: location,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success && response.data.message) {
        setUserProfile({
          ...userProfile,
          bio: response.data.user.bio,
          location: response.data.user.location,
        });
        toast(response.data.message);
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      // Handle error
    }
  };

  return (
    <Wrapper>
      {loading && errorMessage === "" ? (
        <div className="is-loading" style={{ height: "100vh" }}>
          <span>Loading...</span>
          <div className="progress-loading">
            <div className="indeterminate"></div>
          </div>
        </div>
      ) : (
        <div>
          {userProfile ? (
            <div>
              <ToastContainer />
              <div className="ui-feed-header">
                <Link
                  to={`/profile/${userProfile.username}`}
                  className="ui-feed-header-button hover:bg-gray-200 rounded-full p-2 transition"
                >
                  <svg
                    className="icon icon--20"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 6l-6 6 6 6"></path>
                    <path d="M21 12H4"></path>
                    <path strokeLinecap="round" d="M3 12h1"></path>
                  </svg>
                </Link>
                <div className="ui-feed-header-title">Profile Settings</div>
              </div>
              <div
                className="ui-block ui-profile"
                style={{ marginTop: "60px" }}
              >
                <div className="ui-profile-header">
                  <div
                    className="ui-profile-header-thumb cover-bg"
                    id="cover_picture"
                  >
                    <img src={baseURL + userProfile.cover} alt={`${userProfile.username}'s avatar`} />
                    <div className="cover-overlay"></div>
                    <Link className="cover-button" id="change_avatar">
                      <svg
                        className="icon"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <rect width="18" height="18" x="3" y="3"></rect>
                        <path strokeLinecap="round" d="M3 14l4-4 11 11"></path>
                        <circle cx="13.5" cy="7.5" r="2.5"></circle>
                        <path strokeLinecap="round" d="M13.5 16.5L21 9"></path>
                      </svg>
                    </Link>
                    <Link className="cover-button is-right" id="change_cover">
                      <svg
                        className="icon"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        aria-labelledby="cover-icon"
                      >
                        <title id="cover-icon">Change cover</title>
                        <rect width="13" height="13" x="3" y="3"></rect>
                        <polyline points="16 8 21 8 21 21 8 21 8 16"></polyline>
                      </svg>
                    </Link>
                  </div>

                  <div className="ui-profile-block">
                    <div className="ui-profile-user">
                      <a
                        href={baseURL + userProfile.avatar}
                        className="ui-user-thumb"
                        id="profile_picture"
                      >
                        <img
                          src={baseURL + userProfile.avatar}
                          alt={`${userProfile.username}'s avatar`}
                        />
                      </a>
                    </div>
                  </div>

                  <div className="ui-settings">
                    <form
                      onSubmit={handleSubmit}
                      enctype="multipart/form-data"
                      style={{ paddingBottom: "10px" }}
                    >
                      {errorMessage && (
                        <div className="notification-box notification-box-extra notification-box-error">
                          <p>{errorMessage}</p>
                          <div className="notification-close notification-close-error"></div>
                        </div>
                      )}

                      <input
                        type="hidden"
                        className="is-hidden"
                        id="cover_picture_field"
                      />
                      <input
                        type="hidden"
                        className="is-hidden"
                        id="profile_picture_field"
                      />
                      <div className="form-group label-floating">
                        <label className="control-label">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={userProfile.name}
                          readOnly
                        />
                        <p className="material-input p-1">
                          You can't change your name.
                        </p>
                      </div>

                      <div className="form-group label-floating">
                        <label className="control-label">Username</label>
                        <input
                          type="text"
                          className="form-control"
                          value={`#${userProfile.username}`}
                          readOnly
                        />
                        <p className="material-input p-1">
                          You can't change your username.
                        </p>
                      </div>

                      <div className="form-group label-floating">
                        <label className="control-label">E-mail</label>
                        <input
                          type="email"
                          className="form-control"
                          value={userProfile.email}
                          readOnly
                        />
                        <p className="material-input p-1">
                          You can't change your e-mail address.
                        </p>
                      </div>

                      <div className="form-group label-floating">
                        <label className="control-label">Bio</label>
                        <textarea
                          className="form-control"
                          rows="3"
                          onChange={(e) => setBio(e.target.value)}
                          value={bio}
                        />
                        <p className="material-input p-1">
                          Talk more about yourself in 150 characters
                        </p>
                      </div>

                      <div className="form-group label-floating">
                        <label className="control-label">Location</label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={(e) => setLocation(e.target.value)}
                          value={location}
                        />
                        <p className="material-input">
                          Your location helps us suggest questions to you in
                          your area.
                        </p>
                      </div>

                      <div className="flex w-100">
                        <button
                          className="uk-button uk-button-primary mr-2 uk-width-1-1"
                          type="submit"
                          style={{ fontWeight: "600" }}
                        >
                          Save
                        </button>
                      </div>
                    </form>
                    <div className="mb-4"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <NoPage
                title="Not Found"
                description="Hmm... This page or profile does not exist. Try searching for something else."
              />
            </div>
          )}
        </div>
      )}
    </Wrapper>
  );
}

export default Settings;
