import React, { useEffect, useState } from "react";
import useAxios from "../../../utils/useAxios";
import { Link } from "react-router-dom";
import CustomDate from "../../../utils/CustomDate";

const Questions = ({ userProfile, user }) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const api = useAxios();
  const baseURL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/profile/questions/`);
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
                    to={`/question/${q.category.slug}/${q.id}`}
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
                          <i
                            className={
                              q.likes.find(
                                (likedUser) => likedUser === user.user_id
                              )
                                ? "fas fa-heart is-liked"
                                : "far fa-heart"
                            }
                          ></i>
                        </Link>
                      </div>
                    </div>
                    <div className="question-text">
                      <p> {q.content} </p>
                    </div>
                    <div className="question-footer">
                      <div className="likes">
                        <i className="far fa-heart"></i>
                        <span>{q.likes.length}</span>
                      </div>
                      <div className="answers-count">
                        <i className="far fa-comments-alt me-1"></i>
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
                    <h2 className="text-xl font-bold">
                      You haven't posted a question yet.
                    </h2>
                    <div className="mt-2">
                      <p>When you ask a question it'll show up here.</p>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-bold">
                      @{userProfile.username} haven't posted a question yet.
                    </h3>
                    <div className="mt-2">
                      <p> When they post a question it'll show up here.</p>
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

export default Questions;
