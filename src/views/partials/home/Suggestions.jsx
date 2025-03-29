import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxios from "../../../utils/useAxios";

import "../../../static/css/UIkit.css";

function Suggestions() {
  const [categories, setCategories] = useState("");
  const api = useAxios();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [contentLoading, setContentLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setContentLoading(true);
      try {
        const response = await api.get(`/suggestions/`);
        if (response.data.success) {
          setCategories(response.data.categories);
        } else {
          setCategories(null);
          setErrorMessage(response.data.message);
        }
        setLoading(false);
        setContentLoading(false);
      } catch (error) {
        setCategories(null);
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
            <div className="ui-explore-sidebar">
              <div className="ui-block p-3">
                <div className="ui-title text-lg">Explore</div>
                <div className="ui-explore-wrapper">
                  {categories ? (
                    <div>
                      {categories.map((c, index) => (
                        <div className="ui-explore">
                          <div className="icon">
                            <svg
                              className="icon"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M3 13H9V16H15V13H21"></path>
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M3 13L5 4H19L21 13V20H3V13Z"
                              ></path>
                              <path d="M7 7H17"></path>
                              <path d="M6.5 10H17.5"></path>
                            </svg>
                            <span>
                              <svg
                                className="icon"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                aria-labelledby="questions"
                              >
                                <title id="questions">Questions</title>
                                <path d="M12 14C12 12 13.576002 11.6652983 14.1186858 11.1239516 14.663127 10.5808518 15 9.82976635 15 9 15 7.34314575 13.6568542 6 12 6 11.1040834 6 10.2998929 6.39272604 9.75018919 7.01541737 9.49601109 7.30334431 9.29624369 7.64043912 9.16697781 8.01061095"></path>
                                <line x1="12" y1="17" x2="12" y2="17"></line>
                                <circle cx="12" cy="12" r="10"></circle>
                              </svg>{" "}
                              {c.questions_count}
                            </span>
                          </div>

                          <div className="meta">
                            <div className="title">
                              <Link to={`/category/${c.slug}`}>{c.name}</Link>{" "}
                              <span>#{c.slug}</span>
                            </div>
                            <span>{c.description} </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4">
                      <div className="mt-2">
                        <p> Suggested categories will show up here. </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="footer-sidebar">
                <span class="footer-item">© WeAsk</span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Suggestions;
