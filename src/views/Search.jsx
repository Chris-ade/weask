import React, { useState } from "react";
import { Link } from "react-router-dom";
import Wrapper from "./Wrapper";
import useTitle from "../utils/useTitle";
import useAxios from "../utils/useAxios";
import Counter from "../utils/Counter";
import CustomDate from "../utils/CustomDate";

const baseURL = import.meta.env.VITE_BASE_URL;

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
  const [sending, setSending] = useState(false);

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
    setSending(true);

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
          setSending(false);
        } else if (
          response.data.success &&
          response.data.context === "categories"
        ) {
          setCount(response.data.result_count);
          setResult(response.data.categories);
          setNoResult(false);
          setSending(false);
        } else {
          setCount(response.data.result_count);
          setResult(response.data.users);
          setNoResult(false);
          setSending(false);
        }
      } else {
        setNoResult(true);
        setSending(false);
      }
    } catch (error) {
      // Handle error
      setSending(false);
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
              className="btn btn-primary w-full"
              disabled={sending}
            >
              {sending ? "Searching..." : "Search"}
            </button>
          </form>
        </div>

        {context === "q" && result && result.length > 0 ? (
          <div>
            <div className="py-4" id="search_content">
              <div className="ui-search-header">
                <h5 className="font-bold text-xl">Result</h5>
                <span>
                  Found {count} {count > 1 ? "questions" : "question"}
                </span>
              </div>
              {result.map((q, index) => (
                <div className="ui-search" key={index}>
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
                        <i className="far fa-heart me-1"></i> {q.likes_count}
                      </div>
                      <div>
                        <i className="far fa-comments-alt me-1"></i>
                        {q.answers_count}
                      </div>
                    </div>
                    <div>
                      <i className="far fa-box me-1"></i>
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
                <span>
                  Found {count} {count > 1 ? "categories" : "category"}
                </span>
              </div>
              {result.map((c, index) => (
                <div className="ui-search ui-category" key={index}>
                  <Link to={`/category/${c.slug}`}>{c.name}</Link>
                  <div className="ui-search-footer mt-2">
                    <div className="ui-count">
                      <div>
                        <i className="far fa-comments-alt me-1"></i>
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
                <span>
                  Found {count} {count > 1 ? "users" : "user"}
                </span>
              </div>
              {result.map((u, index) => (
                <div className="ui-search ui-user" key={index}>
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
