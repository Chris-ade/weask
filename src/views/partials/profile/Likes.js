import React, { useEffect, useState } from "react";
import useAxios from "../../../utils/useAxios";
import CustomDate from "../../../utils/CustomDate";
import { Link } from "react-router-dom";

const Likes = ({ userProfile, user }) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const api = useAxios();
  const baseURL = "http://localhost:8000/";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/profile/questions/likes/`);
        {
          response.data.success
            ? setData(response.data.questions)
            : setData(null);
        }
        setLoading(false);
      } catch (error) {
        setData(null);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="is-loading">
          <span>Loading...</span>
          <div className="progress-loading">
            <div className="indeterminate"></div>
          </div>
        </div>
      ) : (
        <>
          {data ? (
            data.map((q, index) => (
              <div
                className="question-content uk-animation-slide-left-small"
                id={`question${q.id}`}
                key={index}
              >
                <div className="question-block">
                  <Link
                    to={`/view/question/${q.category.slug}/${q.id}`}
                    className="question-title is-link"
                  >
                    {q.title}
                  </Link>
                  <div className="question-block-inner">
                    <div className="question-author">
                      <img
                        src={baseURL + q.asked_by.avatar}
                        alt={`${q.asked_by.username}'s avatar`}
                      />
                      <div className="meta">
                        <span>
                          {q.asked_by.name}{" "}
                          <span className="username">
                            #{q.asked_by.username}
                          </span>
                        </span>
                        <CustomDate value={q.created_at} />
                      </div>
                      <div className="question-action-button">
                        <Link className="like-button">
                          <svg
                            role="img"
                            className={
                              q.likes.find(
                                (likedUser) => likedUser === user.user_id
                              )
                                ? "icon liked"
                                : "icon"
                            }
                            viewBox="0 0 24 24"
                          >
                            <path d="M12,21 L10.55,19.7051771 C5.4,15.1242507 2,12.1029973 2,8.39509537 C2,5.37384196 4.42,3 7.5,3 C9.24,3 10.91,3.79455041 12,5.05013624 C13.09,3.79455041 14.76,3 16.5,3 C19.58,3 22,5.37384196 22,8.39509537 C22,12.1029973 18.6,15.1242507 13.45,19.7149864 L12,21 Z"></path>
                          </svg>
                        </Link>
                      </div>
                    </div>

                    <div className="question-text">
                      <p> {q.content} </p>
                    </div>
                    <div className="question-footer">
                      <div className="likes">
                        <svg
                          role="img"
                          className="icon icon--16"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12,21 L10.55,19.7051771 C5.4,15.1242507 2,12.1029973 2,8.39509537 C2,5.37384196 4.42,3 7.5,3 C9.24,3 10.91,3.79455041 12,5.05013624 C13.09,3.79455041 14.76,3 16.5,3 C19.58,3 22,5.37384196 22,8.39509537 C22,12.1029973 18.6,15.1242507 13.45,19.7149864 L12,21 Z"></path>
                        </svg>
                        <span>{q.likes.length}</span>
                      </div>
                      <div className="answers-count">
                        <svg
                          className="icon icon--16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                        </svg>
                        <span>{q.answers_count}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="ui-comment-container flex relative w-full">
              <div className="ui-no-contents p-4">
                {userProfile.username === user.username ? (
                  <>
                    <h2 className="text-xl font-bold">Like some questions</h2>
                    <div className="mt-2">
                      <p>
                        Tap the heart icon on a question to show it some love.
                        When you do, it'll show up here.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-bold">
                      @{userProfile.username} hasn't liked a question yet.
                    </h3>
                    <div className="mt-2">
                      <p>When they do, it'll show up here.</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Likes;
