import { useRouteError, Link } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="error-page">
      <div className="card error-card">
        <div className="error-code">!</div>
        <h1>Oops!</h1>
        <p className="muted">Sorry, an unexpected error has occurred.</p>
        <p className="error-detail">
          <i>{error?.statusText || error?.message}</i>
        </p>
        <Link to="/">
          <button type="button">Back to Home</button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
