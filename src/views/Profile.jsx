import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Wrapper from "./Wrapper";
import useTitle from "../utils/useTitle";
import useAxios from "../utils/useAxios";
import AuthContext from "../context/AuthContext";
import { useToast } from "../utils/useToast";
import NoPage from "./NoPage";
import Questions from "./partials/profile/Questions";
import WithAnswers from "./partials/profile/WithAnswers";
import Likes from "./partials/profile/Likes";
import CustomDate from "../utils/CustomDate";

const baseURL = import.meta.env.VITE_BASE_URL;

function Profile() {
  useTitle("Profile | WeAsk");
  const { user } = useContext(AuthContext);
  const { username } = useParams();
  const [userProfile, setUserProfile] = useState("");
  const api = useAxios();
  const [moreData, setMoreData] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [isActive, setIsActive] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/profile/${username}/`);
        {
          response.data.success
            ? setUserProfile(response.data.user)
            : setErrorMessage(response.data.message);
        }
        setLoading(false);
      } catch (error) {
        setUserProfile(null);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    {
      userProfile && fetchQuestions();
    } // Fetch questions when userProfile changes
  }, [userProfile]);

  const fetchQuestions = () => {
    setMoreData(<Questions userProfile={userProfile} user={user} />);
    setIsActive("q");
  };

  const fetchAnswers = () => {
    setMoreData(<WithAnswers userProfile={userProfile} user={user} />);
    setIsActive("a");
  };

  const fetchLikes = () => {
    setMoreData(<Likes userProfile={userProfile} user={user} />);
    setIsActive("l");
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
            <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
              <div className="ui-block ui-profile xl:mt-4">
                <div className="ui-profile-header">
                  <div className="ui-profile-header-thumb cover-bg">
                    <img src={baseURL + userProfile.cover} alt="user cover" />
                    <div className="cover-overlay"></div>
                    <Link className="cover-button" to="/dashboard">
                      <i className="far fa-arrow-left"></i>
                    </Link>
                    {userProfile.username === user.username ? (
                      <Link className="cover-button cover-edit" to="/settings">
                        <i className="far fa-pen"></i>
                      </Link>
                    ) : (
                      <Link className="cover-button cover-edit" to="/settings">
                        <i className="far fa-cog"></i>
                      </Link>
                    )}
                  </div>

                  <div className="ui-profile-block">
                    <div className="ui-profile-user">
                      <Link className="ui-user-stats">
                        <span>{userProfile.questions_count}</span> Questions
                      </Link>
                      <Link
                        to={baseURL + userProfile.avatar}
                        className="ui-user-thumb"
                      >
                        <img
                          src={baseURL + userProfile.avatar}
                          alt={`${userProfile.username}'s avatar`}
                        />
                      </Link>
                      <Link className="ui-user-stats">
                        <span>{userProfile.answers_count}</span> Answers
                      </Link>
                    </div>

                    <div className="ui-user-info">
                      <div className="ui-user-name">{userProfile.name}</div>
                      <span className="ui-at">#{userProfile.username}</span>
                    </div>

                    {userProfile.bio && (
                      <div className="ui-user-bio">{userProfile.bio}</div>
                    )}
                    <div className="ui-user-details">
                      {userProfile.location && (
                        <span className="me-2">
                          <i className="far fa-map-marker-alt me-2"></i>
                          {userProfile.location}
                        </span>
                      )}

                      <span className="me-2">
                        <i className="far fa-calendar me-2"></i>
                        Joined <CustomDate
                          value={userProfile.date_joined}
                        />{" "}
                        ago
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ui-block ui-profile ui-profile-tab-wrapper">
                <ul className="flex-nowrap lg:overflow-hidden overflow-x-scroll uk-tab ui-profile-tab px-2">
                  <li>
                    <Link
                      onClick={fetchQuestions}
                      className={isActive === "q" ? "active" : ""}
                    >
                      Questions<span></span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={fetchAnswers}
                      className={isActive === "a" ? "active" : ""}
                    >
                      Answers<span></span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={fetchLikes}
                      className={isActive === "l" ? "active" : ""}
                    >
                      Likes <span></span>
                    </Link>
                  </li>
                </ul>
                <div className="ui-tabs-content py-3" id="tabs-content">
                  {moreData}
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

export default Profile;
