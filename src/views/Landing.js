import React from "react";
import useTitle from "../utils/useTitle";

function Landing() {
  useTitle("Welcome | WeAsk");

  return (
    <>
      <main style={{ marginTop: 50 }}>
        <div className="container">
          This is the landing page lol...
        </div>
      </main>
    </>
  );
}

export default Landing;
