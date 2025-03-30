import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Wrapper from "./Wrapper";
import useTitle from "../utils/useTitle";
import useAxios from "../utils/useAxios";
import AuthContext from "../context/AuthContext";
import CustomDate from "../utils/CustomDate";

const baseURL = import.meta.env.VITE_BASE_URL;

function ViewQuestions() {
  const { slug } = useParams();

  useTitle(`${slug} | WeAsk`);
  const { user } = useContext(AuthContext);
  const [questions, setQuestions] = useState("");
  const [categories, setCategories] = useState("");
  const api = useAxios();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [contentLoading, setContentLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setContentLoading(true);
      try {
        const response = await api.get(`/questions/${slug}/`);
        setCategories(response.data.categories);
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
  }, [slug]);

  return (
    <Wrapper>
      <section className="container sidebar-boxed py-4">
        <div className="tabs question-tabs is-centered">
          <ul>
            {categories &&
              categories.map((c, index) => (
                <li className={c.slug === slug && "is-active"}>
                  <Link to={`/category/${c.slug}`}>{c.name}</Link>
                </li>
              ))}
          </ul>
        </div>

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
                            to={`/question/${slug}/${q.id}`}
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
      </section>
    </Wrapper>
  );
}

export default ViewQuestions;
