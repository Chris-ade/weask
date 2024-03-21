import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Wrapper from "../views/Wrapper";
import useTitle from "../utils/useTitle";
import useAxios from "../utils/useAxios";
import AuthContext from "../context/AuthContext";

import "../static/css/UIkit.css";
import NoPage from "./NoPage";
import Questions from "./partials/profile/Questions";
import WithAnswers from "./partials/profile/WithAnswers";
import Likes from "./partials/profile/Likes";
import CustomDate from "../utils/CustomDate";

const baseURL = "https://hackinubee.pythonanywhere.com/";

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
            <div>
              <div className="ui-block ui-profile xl:mt-4">
                <div className="ui-profile-header">
                  <div className="ui-profile-header-thumb cover-bg">
                    <img src={baseURL + userProfile.cover} alt="user cover" />
                    <div className="cover-overlay"></div>
                    <Link className="cover-button" to="/dashboard">
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
                    {userProfile.username === user.username ? (
                      <Link className="cover-button cover-edit" to="/settings">
                        <svg
                          className="icon icon--20"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path d="M18.4142136 4.41421356L19.5857864 5.58578644C20.366835 6.36683502 20.366835 7.63316498 19.5857864 8.41421356L8 20 4 20 4 16 15.5857864 4.41421356C16.366835 3.63316498 17.633165 3.63316498 18.4142136 4.41421356zM14 6L18 10"></path>
                        </svg>
                      </Link>
                    ) : (
                      <Link className="cover-button cover-edit" to="/settings">
                        <svg
                          role="img"
                          className="icon icon--20"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinejoin="round"
                            d="M10.5,4.5 C12.1666667,4.5 13.8333333,4.5 15.5,4.5 C17.5,4.5 18.8333333,3.83333333 19.5,2.5 L19.5,18.5 C18.8333333,17.1666667 17.5,16.5 15.5,16.5 C13.8333333,16.5 12.1666667,16.5 10.5,16.5 L10.5,16.5 C7.1862915,16.5 4.5,13.8137085 4.5,10.5 L4.5,10.5 C4.5,7.1862915 7.1862915,4.5 10.5,4.5 Z"
                            transform="rotate(90 12 10.5)"
                          ></path>
                          <path
                            d="M11,21 C12.1045695,21 13,20.1045695 13,19 C13,17.8954305 12.1045695,17 11,17"
                            transform="rotate(90 12 19)"
                          ></path>
                        </svg>
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
                        <span className="mr-2">
                          <svg
                            className="icon icon--16 mr-1"
                            role="img"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12,21 C16,16.8 18,12.8 18,9 C18,5.6862915 15.3137085,3 12,3 C8.6862915,3 6,5.6862915 6,9 C6,12.8 8,16.8 12,21 Z"></path>
                            <circle cx="12" cy="9" r="1"></circle>
                          </svg>
                          {userProfile.location}
                        </span>
                      )}

                      <span className="mr-2">
                        <svg
                          className="icon icon--16 mr-1"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M3 5H21V21H3V5Z"></path>
                          <path d="M21 9H3"></path>
                          <path d="M7 5V3"></path>
                          <path d="M17 5V3"></path>
                        </svg>{" "}
                        Joined <CustomDate value={userProfile.date_joined} /> ago
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
                      className={isActive === "q" && "active"}
                    >
                      Questions<span></span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={fetchAnswers}
                      className={isActive === "a" && "active"}
                    >
                      Answers<span></span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={fetchLikes}
                      className={isActive === "l" && "active"}
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
