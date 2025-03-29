import "../static/css/NoPage.css";
import useTitle from "../utils/useTitle";

export default function NoPage({ title, description }) {
  useTitle("404 NOT FOUND");

  return (
    <div className="no-page-wrapper">
      <div id="text-container">
        <div className="title">
          <h1 className="title-text">{title ? title : "Oops!"}</h1>
        </div>

        <p id="errorShortDesc">
          {description
            ? description
            : "You're requesting a page that doesn't exist on this web app."}
        </p>

        <div id="errorLongDesc" style={{ marginTop: "20px" }}>
          <span>
            <strong>
              If you're sure you entered the right address, you can:
            </strong>
          </span>
          <ul>
            <li>Check the URL and try again.</li>
            <li>Or just press the back button.</li>
          </ul>
        </div>
        <p>ERR: 404 NOT FOUND</p>
      </div>
    </div>
  );
}
