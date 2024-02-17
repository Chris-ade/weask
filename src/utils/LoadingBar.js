import { useState, useEffect } from "react";

export default function LoadingBar() {
  const [loadingBarWidth, setLoadingBarWidth] = useState(0);

  useEffect(() => {
    const startLoadingBar = () => {
      const newWidth = 50 + Math.random() * 30;
      setLoadingBarWidth(`${newWidth}%`);
    };

    const stopLoadingBar = () => {
      setLoadingBarWidth("0%");
    };

    startLoadingBar();

    // Simulating asynchronous behavior with setTimeout
    const timeoutId = setTimeout(() => {
      stopLoadingBar();
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div
      className="progress-loading"
      id="loading-bar"
      style={{ width: loadingBarWidth }}
    >
      <div className="indeterminate"></div>
    </div>
  );
}
