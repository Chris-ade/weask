import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxios from "../../../utils/useAxios";
import AuthContext from "../../../context/AuthContext";

import "../../../static/css/UIkit.css";
import CustomDate from "../../../utils/CustomDate";

const baseURL = "https://hackinubee.pythonanywhere.com/";

function Questions() {
  const { user } = useContext(AuthContext);
  const [questions, setQuestions] = useState("");
  const api = useAxios();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [contentLoading, setContentLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setContentLoading(true);
      try {
        const response = await api.get(`/questions/`);
        if (response.data.success) {
          setQuestions(response.data.questions);
        } else {
          setQuestions(null);
          setErrorMessage(response.data.message);
        }
        setLoading(false);
        setContentLoading(false);
      } catch (error) {
        setQuestions(null);
        setContentLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {loading && errorMessage === "" ? (
        <div className="is-loading" style={{ height: "100vh" }}>
          <span>Loading...</span>
          <div className="progress-loading">
            <div className="indeterminate"></div>
          </div>
        </div>
      ) : (
        <div>
          {contentLoading ? (
            <div className="is-loading" style={{ height: "100vh" }}>
              <span>Loading...</span>
              <div className="progress-loading">
                <div className="indeterminate"></div>
              </div>
            </div>
          ) : (
            <div>
              {questions ? (
                <div>
                  {questions.map((q, index) => (
                    <div
                      className="question-content"
                      id={`question${q.id}`}
                      key={q.id}
                    >
                      <div className="question-block">
                        <Link
                          to={`/question/${q.category_slug}/${q.id}`}
                          className="question-title is-link"
                        >
                          {q.title}
                        </Link>
                        <div className="question-block-inner">
                          <div className="question-author">
                            <img
                              src={baseURL + q.asked_by_avatar}
                              alt={`${q.asked_by}'s avatar`}
                            />
                            <div className="meta">
                              <span>
                                {q.asked_by_name}{" "}
                                <span className="username">#{q.asked_by}</span>
                              </span>
                              <CustomDate value={q.created_at} />
                            </div>
                            <div className="question-action-button">
                              <Link className="like-button">
                                <svg
                                  role="img"
                                  className={
                                    q.liked_by.find(
                                      (likedUser) =>
                                        likedUser.username === user.username
                                    )
                                      ? "icon is-liked"
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
                            <p>{q.content}</p>
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
                              <span>{q.likes_count}</span>
                            </div>
                            <div className="answers-count">
                              <svg
                                className="icon icon--16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                              </svg>
                              <span>{q.answer_count}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4">
                  <h3 className="text-xl font-bold">You're all caught up.</h3>
                  <div className="mt-2">
                    <p> Questions will show up here. </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Questions;
