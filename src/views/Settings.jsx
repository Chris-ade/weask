import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Wrapper from "./Wrapper";
import useTitle from "../utils/useTitle";
import useAxios from "../utils/useAxios";
import AuthContext from "../context/AuthContext";
import NoPage from "./NoPage";
import { useToast } from "../utils/useToast";

const baseURL = import.meta.env.VITE_BASE_URL;

function Settings() {
  useTitle("Profile Settings | WeAsk");
  const { user } = useContext(AuthContext);
  const { toastSuccess, toastError } = useToast();
  const [userProfile, setUserProfile] = useState("");
  const api = useAxios();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/profile/${user.username}/`);
        {
          response.data.success
            ? setUserProfile(response.data.user)
            : toastError(response.data.message);
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
    setSaving(true);

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
        toastSuccess(response.data.message);
      } else {
        toastError(response.data.message);
      }
    } catch (error) {
      // Handle error
      setSaving(false);
    } finally {
      setSaving(false);
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
        <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
          {userProfile ? (
            <div>
              <div className="ui-feed-header">
                <Link
                  to={`/profile/${userProfile.username}`}
                  className="ui-feed-header-button hover:bg-gray-200 rounded-full p-2 transition"
                >
                  <i className="far fa-arrow-left"></i>
                </Link>
                <div className="ui-feed-header-title">Profile Settings</div>
              </div>
              <div
                className="ui-block ui-profile"
                style={{
                  marginTop: "48px",
                  marginBottom: "80px",
                }}
              >
                <div className="ui-profile-header">
                  <div
                    className="ui-profile-header-thumb cover-bg"
                    id="cover_picture"
                  >
                    <img
                      src={baseURL + userProfile.cover}
                      alt={`${userProfile.username}'s avatar`}
                    />
                    <div className="cover-overlay"></div>
                    <Link className="cover-button" id="change_avatar">
                      <i className="far fa-image"></i>
                    </Link>
                    <Link className="cover-button is-right" id="change_cover">
                      <i className="far fa-copy"></i>
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
                      <div className="form-floating mb-3">
                        <input
                          id="name"
                          type="text"
                          className="form-control"
                          value={userProfile.name}
                          readOnly
                        />
                        <label htmlFor="name">Name</label>
                        <p className="form-text">You can't change your name.</p>
                      </div>

                      <div className="form-floating mb-3">
                        <input
                          id="username"
                          type="text"
                          className="form-control"
                          value={`#${userProfile.username}`}
                          readOnly
                        />
                        <label htmlFor="username">Username</label>
                        <p className="form-text">
                          You can't change your username.
                        </p>
                      </div>

                      <div className="form-floating mb-3">
                        <input
                          id="email"
                          type="email"
                          className="form-control"
                          value={userProfile.email}
                          readOnly
                        />
                        <label htmlFor="email">E-mail</label>
                        <p className="form-text">
                          You can't change your e-mail address.
                        </p>
                      </div>

                      <div className="form-floating mb-3">
                        <textarea
                          id="bio"
                          className="form-control"
                          rows="3"
                          onChange={(e) => setBio(e.target.value)}
                          value={bio}
                          style={{ height: "100px" }}
                        />
                        <label htmlFor="bio">Bio</label>
                        <p className="form-text">
                          Talk more about yourself in 150 characters.
                        </p>
                      </div>

                      <div className="form-floating mb-3">
                        <input
                          id="location"
                          type="text"
                          className="form-control"
                          onChange={(e) => setLocation(e.target.value)}
                          value={location}
                        />
                        <label htmlFor="location">Location</label>
                        <p className="form-text">
                          Your location helps us suggest questions to you in
                          your area.
                        </p>
                      </div>

                      <div className="flex w-100">
                        <button
                          className="uk-button uk-button-primary mr-2 uk-width-1-1"
                          type="submit"
                          style={{ fontWeight: "600" }}
                          disabled={saving}
                        >
                          {saving ? "Saving..." : "Save"}
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
