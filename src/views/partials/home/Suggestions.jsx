import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxios from "../../../utils/useAxios";

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
                        <div className="ui-explore" key={index}>
                          <div className="icon">
                            <i className="fas fa-box"></i>
                            <span>
                              <i className="far fa-question-circle"></i>
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
                <span className="footer-item">© WeAsk</span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Suggestions;
