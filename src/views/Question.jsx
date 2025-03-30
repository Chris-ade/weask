import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Wrapper from "./Wrapper";
import useTitle from "../utils/useTitle";
import useAxios from "../utils/useAxios";
import { useToast } from "../utils/useToast";
import AuthContext from "../context/AuthContext";

import "../static/css/UIkit.css";
import CustomDate from "../utils/CustomDate";

const baseURL = import.meta.env.VITE_API_URL;
const imgURL = import.meta.env.VITE_BASE_URL;

function Question() {
  const [pageTitle, setPageTitle] = useState("Question");
  useTitle(`${pageTitle} | WeAsk`);

  const api = useAxios();

  const { user } = useContext(AuthContext);
  const { slug, id } = useParams();
  const { toastSuccess, toastError } = useToast();

  const [questions, setQuestions] = useState("");
  const [answers, setAnswers] = useState("");
  const [comment, setComment] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categorySlug, setCategorySlug] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [contentLoading, setContentLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await api.get(`/question/${slug}/${id}/`);
      if (response.data.success) {
        setPageTitle(response.data.page_title);
        setCategoryName(response.data.category_name);
        setCategorySlug(response.data.category_slug);
        setQuestions(response.data.question);
        setAnswers(response.data.answers);
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

  const handleLike = async (qid) => {
    try {
      const response = await api.post(
        `question/like/`,
        {
          target: qid,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        fetchData();
      }
    } catch (error) {
      toastError("An error occurred.");
    }
  };

  const handleAnswerLike = async (answer_id) => {
    try {
      const response = await api.post(
        `answers/like/`,
        {
          target: answer_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        fetchData();
      }
    } catch (error) {
      toastError("An error occurred.");
    }
  };

  const handleComment = async (e, qid) => {
    e.preventDefault();

    try {
      const response = await api.post(
        `answers/post/`,
        {
          target: qid,
          content: comment,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        fetchData();
      }
    } catch (error) {
      toastError("An error occurred.");
    }
  };

  useEffect(() => {
    setContentLoading(true);
    fetchData();
  }, [slug]);

  return (
    <Wrapper>
      <section className="container sidebar-boxed py-4">
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
                      <>
                        <div className="tabs question-tabs is-centered">
                          <Link
                            className="uk-button"
                            to={`/category/${categorySlug}`}
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
                          <ul>
                            <li className="is-active">
                              <Link to={`/category/${categorySlug}`}>
                                {categoryName}
                              </Link>
                            </li>
                          </ul>
                        </div>

                        <div
                          className="question-content is-view"
                          id={`question${q.id}`}
                          key={q.id}
                        >
                          <div className="question-block">
                            <Link className="question-title is-link">
                              {q.title}
                            </Link>
                            <div className="question-block-inner">
                              <div className="question-author">
                                <img
                                  src={imgURL + q.asked_by_avatar}
                                  alt={`${q.asked_by}'s avatar`}
                                />
                                <div className="meta">
                                  <span>
                                    {q.asked_by_name}{" "}
                                    <span className="username">
                                      #{q.asked_by}
                                    </span>
                                  </span>
                                  <CustomDate value={q.created_at} />
                                </div>
                                <div className="question-action-button">
                                  <Link className="like-button">
                                    <svg
                                      role="img"
                                      onClick={() => handleLike(q.id)}
                                      key={q.id}
                                      className={
                                        q.liked_by.find(
                                          (likedUser) =>
                                            likedUser.username === user.username
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
                                <p>{q.content}</p>
                              </div>

                              <div className="question-footer">
                                <div className="likes">
                                  <i className="far fa-heart"></i>
                                  <span>{q.likes_count}</span>
                                </div>
                                <div className="answers-count">
                                  <i className="far fa-comments-alt"></i>
                                  <span>{q.answers_count}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="new-answer-block">
                            <form
                              onSubmit={(e) => handleComment(e, q.id)}
                              className="w-full"
                            >
                              <input
                                type="text"
                                placeholder="Write an answer..."
                                onChange={(e) => setComment(e.target.value)}
                              />
                              <button
                                type="submit"
                                className="uk-button uk-button-default"
                              >
                                Post
                              </button>
                            </form>
                          </div>

                          <div
                            className="answer-container"
                            id="answer-container"
                          >
                            {answers && (
                              <>
                                {answers.map((ans, index) => (
                                  <div
                                    className={
                                      ans.accepted
                                        ? "answer-block is-best"
                                        : "answer-block"
                                    }
                                    id={`answer${ans.id}`}
                                  >
                                    <div className="answer-author">
                                      <div className="avatar-wrap">
                                        <img
                                          className="avatar"
                                          src={imgURL + ans.by_avatar}
                                          alt={`${ans.by.username}'s avatar`}
                                        />
                                        <div className="accepted-icon">
                                          <svg
                                            className="icon"
                                            role="img"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                          >
                                            <polyline points="7 13 10 16 17 9"></polyline>
                                            <circle
                                              cx="12"
                                              cy="12"
                                              r="10"
                                            ></circle>
                                          </svg>
                                        </div>
                                      </div>
                                      <div className="action-buttons">
                                        <Link
                                          className="upvote-button"
                                          onClick={() =>
                                            handleAnswerLike(ans.id)
                                          }
                                        >
                                          <i
                                            className={
                                              ans.liked_by.find(
                                                (likedUser) =>
                                                  likedUser.username ===
                                                  user.username
                                              )
                                                ? "fas fa-heart is-liked"
                                                : "far fa-heart"
                                            }
                                          ></i>
                                        </Link>

                                        {q.asked_by_username ===
                                          user.username &&
                                          q.has_accepted && (
                                            <Link
                                              className={
                                                ans.accepted
                                                  ? "accept-button accepted"
                                                  : "accepted"
                                              }
                                            >
                                              <svg
                                                role="img"
                                                className="icon"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                ariaLabelledby="accept-icon"
                                              >
                                                <title id="accept-icon">
                                                  Accept answer
                                                </title>
                                                <polyline points="4 13 9 18 20 7"></polyline>
                                              </svg>
                                            </Link>
                                          )}
                                      </div>
                                    </div>

                                    <div className="answer-content">
                                      <div className="meta">
                                        <span>
                                          {ans.by_name}{" "}
                                          {ans.accepted && (
                                            <small className="best-tag">
                                              Best Answer
                                            </small>
                                          )}
                                        </span>
                                        <span>#{ans.by_username}</span>
                                      </div>

                                      <div className="answer-text">
                                        <p>{ans.content}</p>
                                      </div>

                                      <div className="answer-footer">
                                        <div className="upvote">
                                          <svg
                                            role="img"
                                            className="icon icon--16"
                                            viewBox="0 0 24 24"
                                          >
                                            <path d="M12,21 L10.55,19.7051771 C5.4,15.1242507 2,12.1029973 2,8.39509537 C2,5.37384196 4.42,3 7.5,3 C9.24,3 10.91,3.79455041 12,5.05013624 C13.09,3.79455041 14.76,3 16.5,3 C19.58,3 22,5.37384196 22,8.39509537 C22,12.1029973 18.6,15.1242507 13.45,19.7149864 L12,21 Z"></path>
                                          </svg>
                                          <span>{ans.likes_count}</span>
                                        </div>
                                        <div className="time">
                                          <CustomDate value={ans.created_at} />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </>
                            )}
                          </div>
                        </div>
                      </>
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
      </section>
    </Wrapper>
  );
}

export default Question;
