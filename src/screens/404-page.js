import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found">
      <b>Sorry, this page isn't available.</b>
      <p>
        The link you followed may be broken, or the page may have been removed.{" "}
        <Link to="/">Go back to Instagram.</Link>
      </p>
    </div>
  );
};

export default NotFound;
