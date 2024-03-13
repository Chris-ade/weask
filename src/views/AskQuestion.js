import React, { useEffect, useState, useRef } from "react";
import Wrapper from "./Wrapper";
import useTitle from "../utils/useTitle";
import useAxios from "../utils/useAxios";
import Counter from "../utils/Counter";
import Toast from "../utils/useToast";

function AskQuestion() {
  useTitle("Ask a question | WeAsk");

  const api = useAxios();
  const form = useRef();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("programming");
  const [categories, setCategories] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const response = await api.get(`categories/`);
      if (response.data.success) {
        setCategories(response.data.categories);
      } else {
        setCategories(null);
      }
    } catch (error) {
      <Toast type="error" />;
      setCategories(null);
    }
    setLoading(false);
  };

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(
        `question/post/`,
        {
          title: title,
          content: content,
          category: category,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        setTitle("");
        setContent("");
        form.current.reset();
        setCategory("programming");
        <Toast message={response.data.message} />;
      } else {
        <Toast type="error" message={response.data.message} />;
      }
    } catch (error) {
      <Toast type="error" />;
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Wrapper>
      {loading ? (
        <div className="is-loading" style={{ height: "100vh" }}>
          <span>Loading...</span>
          <div className="progress-loading">
            <div className="indeterminate"></div>
          </div>
        </div>
      ) : (
        <section className="container my-2 sidebar-boxed">
          <div className="ui-compose-container ui-block">
            <div className="row">
              <div className="col">
                <div className="ui-compose-title">
                  <h2 className="text-xl font-bold">Ask a question</h2>
                  <span>
                    {" "}
                    Which will be visible under the category you chose.
                  </span>
                </div>
                <form ref={form} onSubmit={handleSubmit}>
                  <div className="form-group label-floating">
                    <label className="control-label">Title</label>
                    <Counter
                      type="text"
                      className="form-control"
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                    <p className="material-input"></p>
                  </div>

                  <div className="form-group label-floating">
                    <label className="control-label">
                      What do you want to ask in full?
                    </label>
                    <Counter
                      className="form-control"
                      cols="100"
                      rows="3"
                      textArea={true}
                      onChange={(e) => setContent(e.target.value)}
                      required
                    />
                    <p className="material-input"></p>
                  </div>

                  <div className="form-group label-floating">
                    <label className="control-label">Select a category</label>
                    <select
                      className="ui-select form-control w-full"
                      onChange={(e) => handleCategory(e)}
                    >
                      {categories &&
                        categories.map((c, index) => (
                          <option value={c.slug}>{c.name}</option>
                        ))}
                    </select>
                  </div>
                  <button
                    className="uk-button uk-button-primary w-full"
                    type="submit"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </Wrapper>
  );
}

export default AskQuestion;
