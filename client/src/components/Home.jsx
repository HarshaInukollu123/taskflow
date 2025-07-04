import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center text-center px-6">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
        TaskFlow
      </h1>
      <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-6">
        A modern task management platform to organize, assign, and track work across teams — built for developers, managers, and admins.
      </p>

      <div className="space-x-4">
        <Link
          to="/register"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md text-lg transition duration-300"
        >
          Get Started
        </Link>
        <Link
          to="/login"
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-md text-lg transition duration-300"
        >
          Login
        </Link>
      </div>

      {/* <img
        src="https://illustrations.popsy.co/gray/task-management.svg"
        alt="Task Management Illustration"
        className="w-full max-w-md mt-10"
      /> */}
    </div>
  );
};

export default Home;
