import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Wrapper from "../views/Wrapper";
import useTitle from "../utils/useTitle";
import useAxios from "../utils/useAxios";
import AuthContext from "../context/AuthContext";

import "../static/css/UIkit.css";
import NoPage from "./NoPage";

const baseURL = "https://hackinubee.pythonanywhere.com/";

function Explore() {
  useTitle("Explore Categories | WeAsk");
  const { user } = useContext(AuthContext);
  const api = useAxios();
  const [categories, setCategories] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/categories/`);
        {
          response.data.success
            ? setCategories(response.data.categories)
            : setErrorMessage(response.data.message);
        }
        setLoading(false);
      } catch (error) {
        setCategories(null);
      }
    };
    fetchData();
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
        <section className="container sidebar-boxed">
          <div className="notification-box notification-box-extra notification-box-success mt-2 p-3">
            <p>Here is a list of all the available categories. </p>
            <p> Click a category to see questions under it.</p>
            <div className="notification-close notification-close-error"></div>
          </div>
          {categories ? (
            <div className="questions-wrap is-smaller">
              <div className="container-fluid">
                <div className="question-content">
                  <div className="row">
                    <div className="column">
                      <div className="tile is-ancestor categories-tile-grid">
                        <div className="tile is-vertical is-8">
                          <div className="tile">
                            <div className="tile is-parent is-vertical">
                              <Link
                                className="tile is-child category-box"
                                to="/category/sci-and-tech"
                              >
                                <img
                                  src={baseURL + "static/icons/lightbulb.svg"}
                                  alt="sci-and-tech icon"
                                />
                                <div className="box-content">
                                  <h3 className="title is-6">
                                    Science & Technology
                                  </h3>
                                  <p>
                                    {" "}
                                    A forum to explore and ask questions about
                                    science and technology and other related
                                    stuff.{" "}
                                  </p>
                                </div>
                              </Link>
                              <Link
                                className="tile is-child category-box"
                                to="/category/books"
                              >
                                <img
                                  src={baseURL + "static/icons/book.svg"}
                                  alt="books icon"
                                />
                                <div className="box-content">
                                  <h3 className="title is-6">
                                    Books & Reading
                                  </h3>
                                  <p>
                                    {" "}
                                    A forum to explore and ask questions about
                                    books, literature and other related stuff.{" "}
                                  </p>
                                </div>
                              </Link>
                            </div>

                            <div className="tile is-parent is-vertical">
                              <Link
                                className="tile is-child category-box"
                                to="/category/movies"
                              >
                                <img
                                  src={baseURL + "static/icons/tv.svg"}
                                  alt="movies and tv icon"
                                />
                                <div className="box-content">
                                  <h3 className="title is-6">
                                    Movies & TV Series
                                  </h3>
                                  <p>
                                    {" "}
                                    A forum to explore and ask questions about
                                    movies, tv series and other related stuff.{" "}
                                  </p>
                                </div>
                              </Link>
                              <Link
                                className="tile is-child category-box"
                                to="/category/general"
                              >
                                <img
                                  src={baseURL + "static/icons/chat-alt.svg"}
                                  alt="general icon"
                                />
                                <div className="box-content">
                                  <h3 className="title is-6">General</h3>
                                  <p>
                                    {" "}
                                    A forum to explore and ask questions about
                                    anything in general.{" "}
                                  </p>
                                </div>
                              </Link>
                            </div>
                          </div>
                          <div className="tile is-parent">
                            <Link
                              className="tile is-child category-box"
                              to="/category/sports-and-fitness"
                            >
                              <img
                                src={baseURL + "static/icons/basketball.svg"}
                                alt="sports and fitness icon"
                              />
                              <div className="box-content">
                                <h3 className="title is-6">Sports & Fitness</h3>
                                <p>
                                  {" "}
                                  A forum to see and ask questions about sports,
                                  fitness, healthy lifestyles and other related
                                  stuff.{" "}
                                </p>
                              </div>
                            </Link>
                          </div>
                        </div>
                        <div className="tile is-parent is-vertical">
                          <Link
                            className="tile is-child category-box is-taller"
                            to="/category/travels"
                          >
                            <img
                              src={baseURL + "static/icons/plane.svg"}
                              alt="travels icon"
                            />
                            <div className="box-content">
                              <h3 className="title is-6">Travels</h3>
                              <p>
                                {" "}
                                A forum to explore and ask questions about
                                traveling and other related stuff.{" "}
                              </p>
                            </div>
                          </Link>
                          <Link
                            className="tile is-child category-box is-taller"
                            to="/category/business"
                          >
                            <img
                              src={baseURL + "static/icons/suitcase.svg"}
                              alt="business icon"
                            />
                            <div className="box-content">
                              <h3 className="title is-6">Business</h3>
                              <p>
                                {" "}
                                A forum to explore and ask questions about
                                business, business ideas and other related
                                stuff.{" "}
                              </p>
                            </div>
                          </Link>
                        </div>
                      </div>

                      <div className="tile is-ancestor">
                        <div className="tile is-parent is-vertical">
                          <Link
                            className="tile is-child category-box is-taller"
                            to="/category/programming"
                          >
                            <img
                              src={baseURL + "static/icons/code-alt.svg"}
                              alt="programming icon"
                            />
                            <div className="box-content">
                              <h3 className="title is-6">Programming</h3>
                              <p>
                                {" "}
                                A forum to explore and ask questions about
                                programming, coding and other related stuff.{" "}
                              </p>
                            </div>
                          </Link>
                          <Link
                            className="tile is-child category-box is-taller"
                            to="/category/automotives"
                          >
                            <img
                              src={baseURL + "static/icons/bike.svg"}
                              alt="cars and automotives icon"
                            />
                            <div className="box-content">
                              <h3 className="title is-6">Cars & Automotives</h3>
                              <p>
                                {" "}
                                A forum to explore and ask questions about cars,
                                automotives and other related stuff.{" "}
                              </p>
                            </div>
                          </Link>
                        </div>
                        <div className="tile is-vertical is-8">
                          <div className="tile">
                            <div className="tile is-parent is-vertical">
                              <Link
                                className="tile is-child category-box"
                                to="/category/relationships"
                              >
                                <img
                                  src={baseURL + "static/icons/favourite.svg"}
                                  alt="relationships icon"
                                />
                                <div className="box-content">
                                  <h3 className="title is-6">Relationships</h3>
                                  <p>
                                    {" "}
                                    A forum to explore and ask questions about
                                    relationships, dating and other related
                                    stuff.{" "}
                                  </p>
                                </div>
                              </Link>
                              <Link
                                className="tile is-child category-box"
                                to="/category/graphics"
                              >
                                <img
                                  src={baseURL + "static/icons/aperture.svg"}
                                  alt="graphics design icon"
                                />
                                <div className="box-content">
                                  <h3 className="title is-6">
                                    Graphics & Designs
                                  </h3>
                                  <p>
                                    {" "}
                                    A forum to explore and ask questions about
                                    graphics, UI/UX designs and other related
                                    stuff{" "}
                                  </p>
                                </div>
                              </Link>
                            </div>
                            <div className="tile is-parent is-vertical">
                              <Link
                                className="tile is-child category-box"
                                to="/category/health"
                              >
                                <img
                                  src={baseURL + "static/icons/activity.svg"}
                                  alt="health icon"
                                />
                                <div className="box-content">
                                  <h3 className="title is-6">Health</h3>
                                  <p>
                                    {" "}
                                    A forum to explore and ask questions about
                                    health, health issues, medicines and other
                                    related stuff
                                  </p>
                                </div>
                              </Link>
                              <Link
                                className="tile is-child category-box"
                                to="/category/entertainment'"
                              >
                                <img
                                  src={baseURL + "static/icons/music.svg"}
                                  alt="entertainment icon"
                                />
                                <div className="box-content">
                                  <h3 className="title is-6">Entertainment</h3>
                                  <p>
                                    {" "}
                                    A forum to explore and ask questions about
                                    musics, entertainment related stuff{" "}
                                  </p>
                                </div>
                              </Link>
                            </div>
                          </div>
                          <div className="tile is-parent">
                            <Link
                              className="tile is-child category-box"
                              to="/category/astronomy"
                            >
                              <img
                                src={baseURL + "static/icons/rocket.svg"}
                                className=""
                                alt="astronomy icon"
                              />
                              <div className="box-content is-6">
                                <h3 className="title">Astronomy</h3>
                                <p>
                                  {" "}
                                  A forum to explore and ask questions about
                                  astrology, space and other related stuff.{" "}
                                </p>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4">
              <h3 className="text-xl font-bold">You're all caught up</h3>
              <div className="mt-2">
                <p>Questions categories will show up here.</p>
              </div>
            </div>
          )}
        </section>
      )}
    </Wrapper>
  );
}

export default Explore;
