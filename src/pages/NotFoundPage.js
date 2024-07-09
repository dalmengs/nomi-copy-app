import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen bg-white">
            <h1 className="text-[150px] font-bold text-purple-700">404</h1>
            <p className="text-[25px] text-gray-700">Page Not Found</p>
            <Link to="/main" className="mt-6">
                <button className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded">
                  Go to Main Page
                </button>
            </Link>
        </div>
    );
};

export default NotFoundPage;
