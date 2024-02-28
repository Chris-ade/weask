import React from "react";
import LoadingBar from "../utils/LoadingBar";
import SideNav from "../views/partials/SideNav";

const Wrapper = ({ children }) => {
  return (
    <div className="view-container">
      <LoadingBar />
      <div className="app-overlay" id="app-overlay"></div>
      <SideNav />
      <main
        id="content"
        role="main"
        className="view-wrapper is-sidebar-view h-full"
      >
        {children}
      </main>
    </div>
  );
};

export default Wrapper;
