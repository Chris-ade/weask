import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Wrapper from "./Wrapper";
import Questions from "./partials/home/Questions";
import Recommended from "./partials/home/Recommended";
import Suggestions from "./partials/home/Suggestions";
import ActionButtons from "./partials/home/ActionButtons";
import useTitle from "../utils/useTitle";

function Home() {
  useTitle("Home | WeAsk");
  const { user } = useContext(AuthContext);

  return (
    <Wrapper>
      <section className="container sidebar-boxed">
        <div className="row justify-center py-2">
          <div className="col-sm-12 col-md-7 col-lg-7 col-xl-7 py-1">
            <div className="notification-box notification-box-extra notification-box-success mb-4 p-3">
              <p>
                Welcome, <span className="font-bold">#{user.username}</span>.{" "}
              </p>
              <p>
                {" "}
                Here is your dashboard containing your questions and some
                recommended questions you might want to check out.
              </p>
              <div className="notification-close notification-close-error"></div>
            </div>
            <Questions />
            <Recommended />
          </div>

          <div className="col-sm-12 col-md-5 col-lg-5 col-xl-5 py-2 is-hidden-mobile">
            <Suggestions />
          </div>
        </div>
        <ActionButtons />
      </section>
    </Wrapper>
  );
}

export default Home;
