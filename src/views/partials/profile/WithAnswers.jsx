import React, { useEffect, useState } from "react";
import useAxios from "../../../utils/useAxios";
import { Link } from "react-router-dom";
import CustomDate from "../../../utils/CustomDate";

const WithAnswers = ({ userProfile, user }) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const api = useAxios();
  const baseURL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/profile/questions/with_answers/`);
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
                id={`question${q.question.id}`}
                key={index}
              >
                <div className="question-block">
                  <Link
                    to={`/question/${q.question.category.slug}/${q.question.id}`}
                    className="question-title is-link"
                  >
                    {q.question.title}
                  </Link>
                  <div className="question-block-inner">
                    <div className="question-author">
                      <img
                        src={baseURL + q.by.avatar}
                        alt={`${q.by.username}'s avatar`}
                      />
                      <div className="meta">
                        <span>
                          {q.by.name}{" "}
                          <span className="username">#{q.by.username}</span>
                        </span>
                        <CustomDate value={q.created_at} />
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
                      {q.accepted && (
                        <div className="answers-count">
                          <i className="far fa-check me-1"></i>
                          <span>Accepted</span>
                        </div>
                      )}
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
                      You haven't posted an answer to a question yet.
                    </h2>
                    <div className="mt-2">
                      <p>Your answers to questions will show up here.</p>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-bold">
                      @{userProfile.username} hasn't posted an answer to a
                      question yet.
                    </h3>
                    <div className="mt-2">
                      <p>Once they do, those answers will show up here.</p>
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

export default WithAnswers;
