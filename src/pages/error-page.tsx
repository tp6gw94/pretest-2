import { Helmet } from 'react-helmet-async';

const ErrorPage = () => {
  return (
    <div>
      <Helmet>
        <title>Error</title>
      </Helmet>
      <div className="vw-100 vh-100 d-flex flex-column justify-content-center align-items-center bg-dark">
        <h3 className="text-light">Error</h3>
        <button onClick={() => location.reload()} className="btn btn-outline-light">Reload Page</button>
      </div>

    </div>
  );
};

export default ErrorPage;
