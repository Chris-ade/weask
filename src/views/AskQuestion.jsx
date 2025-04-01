import React, { useEffect, useState, useRef } from "react";
import Wrapper from "./Wrapper";
import useTitle from "../utils/useTitle";
import useAxios from "../utils/useAxios";
import Counter from "../utils/Counter";
import { useToast } from "../utils/useToast";

function AskQuestion() {
  useTitle("Ask a question | WeAsk");

  const api = useAxios();
  const form = useRef();
  const { toastSuccess, toastError } = useToast();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("programming");
  const [categories, setCategories] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const fetchCategories = async () => {
    try {
      const response = await api.get(`categories/`);
      if (response.data.success) {
        setCategories(response.data.categories);
      } else {
        setCategories(null);
      }
    } catch (error) {
      toastError("An error occurred.");
      setCategories(null);
    }
    setLoading(false);
  };

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
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
        toastSuccess(response.data.message);
        setSending(false);
      } else {
        toastError(response.data.message);
        setSending(false);
      }
    } catch (error) {
      toastError("An error occurred.");
      setSending(false);
    } finally {
      setSending(false);
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
                  <div className="mb-3">
                    <Counter
                      type="text"
                      className="form-control"
                      id="titleInput"
                      placeholder="Title"
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <Counter
                      className="form-control"
                      id="contentInput"
                      placeholder="What do you want to ask in full?"
                      cols="100"
                      rows="3"
                      textArea={true}
                      onChange={(e) => setContent(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-floating mb-3">
                    <select
                      className="form-select"
                      id="categorySelect"
                      onChange={(e) => handleCategory(e)}
                    >
                      {categories &&
                        categories.map((c, index) => (
                          <option key={index} value={c.slug}>
                            {c.name}
                          </option>
                        ))}
                    </select>
                    <label htmlFor="categorySelect">Select a category</label>
                  </div>
                  <button
                    className="btn btn-primary w-full"
                    type="submit"
                    disabled={sending}
                  >
                    {sending ? "Submitting..." : "Submit"}
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
