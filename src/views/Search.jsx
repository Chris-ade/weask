import React, { useState } from "react";
import { Link } from "react-router-dom";
import Wrapper from "./Wrapper";
import useTitle from "../utils/useTitle";
import useAxios from "../utils/useAxios";
import Counter from "../utils/Counter";
import CustomDate from "../utils/CustomDate";

const baseURL = import.meta.env.VITE_API_URL;

function Search() {
  useTitle(`Search | WeAsk`);

  const api = useAxios();

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("q");

  const [result, setResult] = useState("");
  const [count, setCount] = useState("");
  const [context, setContext] = useState("q");

  const [noResult, setNoResult] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleFilter = async (e) => {
    const selectedFilter = e.target.value;
    // Update filter state based on selected filter
    setFilter(selectedFilter);
    // Update context based on selected filter
    let newContext = "";
    if (selectedFilter === "q") {
      newContext = "q";
    } else if (selectedFilter === "c") {
      newContext = "c";
    } else {
      newContext = "u";
    }
    setContext(newContext);
    // Fetch data directly with the selected filter
    await fetchData(selectedFilter);
  };

  const fetchData = async (selectedFilter) => {
    // Reset state variables
    setResult([]);
    setCount("");
    setNoResult(false);

    try {
      const response = await api.post(
        `search/`,
        {
          query: query,
          filter: selectedFilter,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        if (response.data.context === "questions") {
          setCount(response.data.result_count);
          setResult(response.data.questions);
          setNoResult(false);
        } else if (
          response.data.success &&
          response.data.context === "categories"
        ) {
          setCount(response.data.result_count);
          setResult(response.data.categories);
          setNoResult(false);
        } else {
          setCount(response.data.result_count);
          setResult(response.data.users);
          setNoResult(false);
        }
      } else {
        setNoResult(true);
      }
    } catch (error) {
      // Handle error
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Fetch data with the current filter state
    await fetchData(filter);
  };

  return (
    <Wrapper>
      <section className="container sidebar-boxed">
        <div className="ui-block my-4 p-4 bg-white">
          <div style={{ marginBottom: "14px" }}>
            <div className="font-bold text-2xl">Search</div>
            <span> You can search for categories, questions and users. </span>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <Counter
                className="form-control"
                inputType="search"
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={fetchData}
                textArea={false}
                required
                placeholder="Search...."
              />
            </div>
            <div className="form-group label-floating">
              <label className="control-label">What to look for?</label>
              <select
                value={filter}
                className="ui-select form-control w-full"
                onChange={(e) => handleFilter(e)}
                required
              >
                <option value="q" defaultValue={true}>
                  Questions
                </option>
                <option value="c">Categories</option>
                <option value="u">Users</option>
              </select>
            </div>
            <button
              type="submit"
              className="uk-button uk-button-default w-full"
            >
              Search
            </button>
          </form>
        </div>

        {context === "q" && result && result.length > 0 ? (
          <div>
            <div className="py-4" id="search_content">
              <div className="ui-search-header">
                <h5 className="font-bold text-xl">Result</h5>
                <span>Found {`${count} questions`}</span>
              </div>
              {result.map((q, index) => (
                <div className="ui-search">
                  <span>
                    <Link to={`/question/${q.category.slug}/${q.id}`}>
                      {q.title}
                    </Link>
                  </span>
                  <div className="stats">
                    <span>
                      Posted <CustomDate value={q.created_at} /> ago
                    </span>
                  </div>
                  <div className="ui-search-footer">
                    <div className="ui-count">
                      <div>
                        <svg
                          role="img"
                          className="icon {% if request.user in q.likes.all %}is-liked{% endif %}"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12,21 L10.55,19.7051771 C5.4,15.1242507 2,12.1029973 2,8.39509537 C2,5.37384196 4.42,3 7.5,3 C9.24,3 10.91,3.79455041 12,5.05013624 C13.09,3.79455041 14.76,3 16.5,3 C19.58,3 22,5.37384196 22,8.39509537 C22,12.1029973 18.6,15.1242507 13.45,19.7149864 L12,21 Z"></path>
                        </svg>{" "}
                        {q.likes_count}
                      </div>
                      <div>
                        <svg
                          className="icon"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                        </svg>{" "}
                        {q.answers_count}
                      </div>
                    </div>
                    <div>
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
                      </svg>{" "}
                      {q.category}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : context === "c" && result && result.length > 0 ? (
          <div>
            <div className="py-4" id="search_content">
              <div className="ui-search-header">
                <h5 className="font-bold text-xl">Result</h5>
                <span>Found {`${count} categories`}</span>
              </div>
              {result.map((c, index) => (
                <div className="ui-search ui-category">
                  <Link to={`/category/${c.slug}`}>{c.name}</Link>
                  <div className="ui-search-footer mt-2">
                    <div className="ui-count">
                      <div>
                        <svg
                          className="icon"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                        </svg>{" "}
                        {c.questions_count}
                      </div>
                    </div>
                    <div></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : context === "u" && result && result.length > 0 ? (
          <div>
            <div className="py-4" id="search_content">
              <div className="ui-search-header">
                <h5 className="font-bold text-xl">Result</h5>
                <span>Found {`${count} users`}</span>
              </div>
              {result.map((u, index) => (
                <div className="ui-search ui-user">
                  <div className="ui-thumb">
                    <img
                      src={baseURL + u.avatar}
                      alt={`${u.username}'s avatar`}
                    />
                  </div>
                  <div className="ui-details">
                    <Link to={`/profile/${u.username}`}>
                      {u.name} <span>#{u.username}</span>
                    </Link>
                    <div className="ui-search-footer">
                      <div>Questions: {u.total_answers}</div>
                      <div>Answers: {u.total_questions}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            {noResult && (
              <div className="py-4" id="search_content">
                <div className="ui-search-header">
                  <h5 className="font-bold text-xl">Result</h5>
                </div>
                <div className="ui-search no-contents">
                  <h2>Nothing was found for your search.</h2>
                  <div className="mt-1">Try another search.</div>
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </Wrapper>
  );
}

export default Search;
