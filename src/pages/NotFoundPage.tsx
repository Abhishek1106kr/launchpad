import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import Button from '../components/common/Button';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
          <h1 className="text-9xl font-bold text-blue-600">404</h1>
          <h2 className="mt-4 text-2xl font-bold text-gray-900">Page Not Found</h2>
          <p className="mt-2 text-sm text-gray-600">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <div className="mt-6">
            <Link to="/">
              <Button variant="primary" leftIcon={<Home size={18} />}>
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;