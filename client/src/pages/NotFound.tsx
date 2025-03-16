import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="max-w-md mx-auto py-16 px-4 text-center">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">404</h1>
      <h2 className="mt-4 text-xl font-medium text-gray-700 dark:text-gray-300">Page Not Found</h2>
      <p className="mt-2 text-gray-500 dark:text-gray-400">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <div className="mt-6">
        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
