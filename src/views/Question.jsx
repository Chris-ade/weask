import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Wrapper from "./Wrapper";
import useTitle from "../utils/useTitle";
import useAxios from "../utils/useAxios";
import { useToast } from "../utils/useToast";
import AuthContext from "../context/AuthContext";
import CustomDate from "../utils/CustomDate";

const baseURL = import.meta.env.VITE_BASE_URL;

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
  const [loading, setLoading] = useState(true);
  const [contentLoading, setContentLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await api.get(`/question/${slug}/${id}/`);
      if (!response.data.success) {
        toastError(response.data.message);
        return setQuestions(null);
      }

      // Only update state if data is different
      setPageTitle((prev) =>
        prev !== response.data.page_title ? response.data.page_title : prev
      );
      setCategoryName((prev) =>
        prev !== response.data.category_name
          ? response.data.category_name
          : prev
      );
      setCategorySlug((prev) =>
        prev !== response.data.category_slug
          ? response.data.category_slug
          : prev
      );
      setQuestions((prev) =>
        JSON.stringify(prev) !== JSON.stringify(response.data.question)
          ? response.data.question
          : prev
      );
      setAnswers((prev) =>
        JSON.stringify(prev) !== JSON.stringify(response.data.answers)
          ? response.data.answers
          : prev
      );

      setLoading(false);
      setContentLoading(false);
    } catch (error) {
      console.error("Error fetching question data:", error);
      setQuestions(null);
      setContentLoading(false);
    }
  };

  const toggleLike = async (endpoint, target) => {
    try {
      const response = await api.post(
        endpoint,
        { target },
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.data.success) fetchData();
    } catch (error) {
      toastError("An error occurred.");
    }
  };

  const handleLike = (qid) => toggleLike(`question/like/`, qid);
  const handleAnswerLike = (answer_id) =>
    toggleLike(`answers/like/`, answer_id);

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
  }, [slug, id]);

  return (
    <Wrapper>
      <section className="container sidebar-boxed py-4">
        {loading ? (
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
                {questions && questions.length > 0 ? (
                  <div>
                    <div className="tabs question-tabs is-centered">
                      <Link
                        className="uk-button"
                        to={`/category/${categorySlug}`}
                      >
                        <i className="far fa-arrow-left is-arrow-back"></i>
                      </Link>
                      <ul>
                        <li className="is-active">
                          <Link to={`/category/${categorySlug}`}>
                            {categoryName}
                          </Link>
                        </li>
                      </ul>
                    </div>

                    {questions.map((q, index) => (
                      <div
                        className="question-content is-view"
                        id={`question${q.id}`}
                        key={index}
                      >
                        <div className="question-block">
                          <Link className="question-title is-link">
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
                                  <span className="username">
                                    #{q.asked_by}
                                  </span>
                                </span>
                                <CustomDate value={q.created_at} />
                              </div>
                              <div className="question-action-button">
                                <Link className="like-button">
                                  <i
                                    className={
                                      q.liked_by.find(
                                        (likedUser) =>
                                          likedUser.username === user.username
                                      )
                                        ? "fas fa-heart is-liked"
                                        : "far fa-heart"
                                    }
                                    onClick={() => handleLike(q.id)}
                                    key={q.id}
                                  ></i>
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

                        <div className="answer-container" id="answer-container">
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
                                        src={baseURL + ans.by_avatar}
                                        alt={`${ans.by.username}'s avatar`}
                                      />
                                      <div className="accepted-icon">
                                        <i className="fas fa-check"></i>
                                      </div>
                                    </div>
                                    <div className="action-buttons">
                                      <Link
                                        className="upvote-button"
                                        onClick={() => handleAnswerLike(ans.id)}
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

                                      {q.asked_by_username === user.username &&
                                        q.has_accepted && (
                                          <Link
                                            className={
                                              ans.accepted
                                                ? "accept-button accepted"
                                                : "accepted"
                                            }
                                          >
                                            <i className="far fa-check"></i>
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
                                        <i className="far fa-heart"></i>
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
                    ))}
                  </div>
                ) : (
                  <div className="p-4">
                    <h3 className="text-xl font-bold">Oops.</h3>
                    <div className="mt-2">
                      <p>That link doesn't look right.</p>
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
