import React from "react";

const Wrapper = ({ children }) => {
    return (
        <>
        <div className="app-overlay" id="app-overlay"></div>
        <main id="content" role="main" className="view-wrapper is-sidebar-view h-full">
            { children }
        </main>
        </>
    );
}

export default Wrapper;