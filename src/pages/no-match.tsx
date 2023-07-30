import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { routerPaths } from '../app/routerPaths.ts';

const NoMatch = () => {
  return (
    <div>
      <Helmet>
        <title>404 Not Found</title>
      </Helmet>
      <div className="d-flex flex-column vh-100 vw-100 bg-dark justify-content-center align-items-center">
        <h3 className="text-light">
          404 Not Found
        </h3>
        <Link to={routerPaths.home} className="btn btn-outline-light mt-2">Back to Homepage</Link>
      </div>
    </div>
  );
};

export default NoMatch;
