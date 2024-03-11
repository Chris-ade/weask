import React, { useEffect, useState } from "react";
import useAxios from "../../../utils/useAxios";
import { Link } from "react-router-dom";
import CustomDate from "../../../utils/CustomDate";

const WithAnswers = ({ userProfile, user }) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const api = useAxios();
  const baseURL = "http://localhost:8000/";

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
                    to={`/view/question/${q.question.category.slug}/${q.question.id}`}
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
                        <svg
                          role="img"
                          className="icon icon--16"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12,21 L10.55,19.7051771 C5.4,15.1242507 2,12.1029973 2,8.39509537 C2,5.37384196 4.42,3 7.5,3 C9.24,3 10.91,3.79455041 12,5.05013624 C13.09,3.79455041 14.76,3 16.5,3 C19.58,3 22,5.37384196 22,8.39509537 C22,12.1029973 18.6,15.1242507 13.45,19.7149864 L12,21 Z"></path>
                        </svg>
                        <span>{q.likes.length}</span>
                      </div>
                      {q.accepted && (
                        <div className="answers-count">
                          <svg
                            role="img"
                            className="icon icon--16"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            aria-labelledby="accepted-icon"
                          >
                            <title id="accepted-icon">Accepted</title>
                            <polyline points="4 13 9 18 20 7"></polyline>
                          </svg>
                          <span> Accepted </span>
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
