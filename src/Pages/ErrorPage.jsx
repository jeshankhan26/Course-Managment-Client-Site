import React from "react";
import Lottie from "lottie-react";
import errorAnimation from "../../public/Animation - 1749682649793.json";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <div className="w-72 sm:w-96">
        <Lottie animationData={errorAnimation} loop={true} />
      </div>
      <h1 className="text-4xl font-bold text-error">404 - Page Not Found</h1>
      <p className="mt-4 text-lg text-black">
        Sorry, the page you're looking for doesn't exist.
      </p>
      <Link to="/" className="btn btn-primary mt-6">
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
