import React, { useContext, useState } from "react";
import Lottie from "lottie-react";
import animationData from "../../public/Animation - 1749425521088.json";
import { NavLink } from "react-router";
import { Helmet } from "react-helmet";
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { AuthContext } from "../Provider/AuthContext";
import { auth } from "../Provider/firebase.init";
import Swal from "sweetalert2";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const googleProvider = new GoogleAuthProvider();
  const provider = new GithubAuthProvider();
  const { login } = useContext(AuthContext);

  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        console.log("Google User:", user);
        Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        window.location.href = "/";
      });
      })
      .catch((error) => {
        console.error("Google login error:", error.message);
        alert(error.message);
      });
  };
  const handleGithub = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log("Google User:", user);
        Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        window.location.href = "/";
      });
      })
      .catch((error) => {
        console.error("Google login error:", error.message);
        alert(error.message);
      });
  };

 const handleSubmit = (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;
  console.log("Email:", email, "Password:", password);

  login(email, password)
    .then((result) => {
      const user = result.user;
      console.log("Email/Password User:", user);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        window.location.href = "/";
      });
    })
    .catch((error) => {
      console.error("Login error:", error.message);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message || "Something went wrong during login.",
      });
    });
};


  return (
    <>
      <Helmet>
        <title>login Page</title>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-accent-content p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 flex flex-col gap-6">
          {/* Lottie Animation */}
          <div className="w-40 mx-auto">
            <Lottie animationData={animationData} loop={true} />
          </div>

          <h2 className="text-3xl font-bold text-center text-gray-800">
            Login
          </h2>

          {/* Login Form */}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Email */}
            <input
              type="email" name="email"
              placeholder="Email"
              className="input input-bordered bg-white text-black input-primary w-full"
            />

            {/* Password with eye toggle */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password" name="password"
                className="input input-bordered bg-white text-black input-primary w-full pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 btn btn-sm btn-square btn-ghost"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  // Eye Off Icon (simple SVG)
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-9a8.956 8.956 0 012.167-5.505M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      opacity="0.3"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3l18 18"
                    />
                  </svg>
                ) : (
                  // Eye Icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>

            {/* Login button */}
            <button type="submit" className="btn btn-primary w-full">
              Login
            </button>
          </form>

          {/* Social Login Buttons */}
          <div className="flex justify-center gap-4">
            <button onClick={handleGoogleLogin} className="btn btn-outline btn-success flex-1 flex items-center justify-center gap-2">
              {/* Google Icon */}
              <svg
                className="w-5 h-5"
                viewBox="0 0 533.5 544.3"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M533.5 278.4c0-18.5-1.5-37.5-4.8-55.5H272v105.3h146.9c-6.3 34.1-25.4 62.9-54.4 82.1v67h87.7c51.4-47.4 81.3-117 81.3-198.9z"
                  fill="#4285F4"
                />
                <path
                  d="M272 544.3c73.8 0 135.7-24.5 180.9-66.5l-87.7-67c-24.3 16.3-55.3 26-93.2 26-71.5 0-132-48.3-153.5-113.5H30.2v71.1c44.5 87.3 135.4 149.9 241.8 149.9z"
                  fill="#34A853"
                />
                <path
                  d="M118.5 325.3c-10.2-30.6-10.2-63.5 0-94.1v-71.1H30.2c-39.5 77.4-39.5 169.3 0 246.7l88.3-71.5z"
                  fill="#FBBC05"
                />
                <path
                  d="M272 107.7c39.9 0 75.8 13.8 104.1 40.8l78.1-78.1C407.5 24.5 345.6 0 272 0 165.5 0 74.6 62.6 30.2 150l88.3 71.1c21.5-65.2 82-113.4 153.5-113.4z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </button>

            <button onClick={handleGithub} className="btn btn-outline btn-neutral flex-1 flex items-center justify-center gap-2">
              {/* Github Icon */}
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.603-3.369-1.343-3.369-1.343-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.944 0-1.091.39-1.983 1.029-2.682-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.748-1.025 2.748-1.025.546 1.377.202 2.394.1 2.647.64.7 1.028 1.59 1.028 2.682 0 3.842-2.338 4.687-4.566 4.935.359.31.678.922.678 1.86 0 1.343-.013 2.423-.013 2.75 0 .268.18.58.688.48A10.014 10.014 0 0022 12c0-5.523-4.477-10-10-10z"
                  clipRule="evenodd"
                />
              </svg>
              Github
            </button>
          </div>
          <div className="text-center">
            <NavLink
              to={"/register"}
              className="mt-4 text-center text-sm text-blue-600 hover:underline cursor-pointer"
            >
              Don't have an account? Register
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
