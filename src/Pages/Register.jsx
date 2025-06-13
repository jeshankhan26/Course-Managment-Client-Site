import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import animationData from "../../public/Animation - 1749339143204.json";
import { Player } from "@lottiefiles/react-lottie-player";
import { NavLink } from "react-router";
import { Helmet } from "react-helmet";
import { AuthContext } from "../Provider/AuthContext";
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import { auth } from "../Provider/firebase.init";

const RegisterPage = () => {
  const googleProvider = new GoogleAuthProvider();
  const provider = new GithubAuthProvider();


const handleGoogleRegister = async () => {
  try {
    // 1. Sign in with Google popup
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // 2. Extract user info from Google
    const name = user.displayName || "No Name";
    const email = user.email || "No Email";
    const photoURL = user.photoURL || "";

    // 3. Update Firebase user profile with name and photoURL
    await updateProfile(user, { displayName: name, photoURL });

    // 4. Send user data to your backend
    const response = await fetch("https://course-server-puce.vercel.app/adduser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, photoURL }),
    });

    const data = await response.json();

    // 5. Handle backend response
    if (data.insertedId) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Registration Done",
        showConfirmButton: false,
        timer: 1500,
      });
      window.location.href = "/";
    } else {
      throw new Error("User data not saved to server");
    }
  } catch (error) {
    console.error("Google login error:", error.message);
    Swal.fire({
      icon: "error",
      title: "Registration Failed",
      text: error.message || "Something went wrong!",
    });
  }
};

const handleGithub = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const name = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;

    // Optional: Update Firebase profile
    await updateProfile(user, {
      displayName: name,
      photoURL: photoURL,
    });

    // Save to backend
    const response = await fetch("http://localhost:3000/adduser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, photoURL }),
    });

    const data = await response.json();

    if (data.insertedId) {
    

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Registration Done",
        showConfirmButton: false,
        timer: 1500,
      });
      window.location.href = "/";
    } else {
      throw new Error("User data not saved to server");
    }
  } catch (error) {
    console.error("Google login error:", error.message);
    Swal.fire({
      icon: "error",
      title: "Registration Failed",
      text: error.message || "Something went wrong!",
    });
  }
};


  const { createAccountwithEmail } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: "",
    photoURL: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const validatePassword = (password, email) => {
    const errors = [];
    if (password.length < 8)
      errors.push("Password must be at least 8 characters long.");
    if (!/[A-Z]/.test(password))
      errors.push("Password must have at least one uppercase letter.");
    if (!/[a-z]/.test(password))
      errors.push("Password must have at least one lowercase letter.");
    if (!/[0-9]/.test(password))
      errors.push("Password must have at least one number.");
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
      errors.push("Password must have at least one special character.");
    if (email && password.toLowerCase().includes(email.toLowerCase()))
      errors.push("Password cannot contain your email address.");
    return errors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleregister = async (e) => {
    e.preventDefault();
    let validationErrors = {};

    // Validate required fields
    if (!form.name.trim()) validationErrors.name = "Name is required.";
    if (!form.email.trim()) validationErrors.email = "Email is required.";
    if (!form.photoURL.trim()) validationErrors.photoURL = "Photo URL is required.";

    // Validate password
    const pwdErrors = validatePassword(form.password, form.email);
    if (pwdErrors.length > 0)
      validationErrors.password = pwdErrors.join(" ");

    // Confirm password
    if (form.password !== form.confirmPassword)
      validationErrors.confirmPassword = "Passwords do not match.";

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      const result = await createAccountwithEmail(form.email, form.password);
      const user = result.user;

      // Update Firebase profile with name and photo
      await updateProfile(user, {
        displayName: form.name,
        photoURL: form.photoURL,
      });

      // Save to backend
      const response = await fetch("http://localhost:3000/adduser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          photoURL: form.photoURL,
        }),
      });

      const data = await response.json();

      if (data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Registration Done",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          window.location.href = "/";
        });
      } else {
        throw new Error("User data not saved to server");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message || "Something went wrong!",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Register Page</title>
      </Helmet>
      <div className="min-h-screen bg-accent-content flex flex-col md:flex-row items-center justify-center p-6 gap-10">
        <div className="w-full md:w-1/2 max-w-lg">
          <Player autoplay loop src={animationData} style={{ height: "400px", width: "400px" }} />
        </div>

        <div className="w-full md:w-1/2 max-w-md bg-indigo-50 text-black p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
          <form onSubmit={handleregister}>
            {/* Name */}
            <label className="block mb-2 font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className={`w-full p-3 mb-3 border rounded ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Your full name"
              required
            />
            {errors.name && <p className="text-red-500 mb-3">{errors.name}</p>}

            {/* Photo URL */}
            <label className="block mb-2 font-semibold">Photo URL</label>
            <input
              type="url"
              name="photoURL"
              value={form.photoURL}
              onChange={handleChange}
              className={`w-full p-3 mb-3 border rounded ${
                errors.photoURL ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="https://example.com/photo.jpg"
              required
            />
            {errors.photoURL && <p className="text-red-500 mb-3">{errors.photoURL}</p>}

            {/* Email */}
            <label className="block mb-2 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={`w-full p-3 mb-3 border rounded ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="your.email@example.com"
              required
            />
            {errors.email && <p className="text-red-500 mb-3">{errors.email}</p>}

            {/* Password */}
            <label className="block mb-2 font-semibold">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className={`w-full p-3 mb-3 border rounded ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your password"
              required
            />
            {errors.password && <p className="text-red-500 mb-3">{errors.password}</p>}

            {/* Confirm Password */}
            <label className="block mb-2 font-semibold">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className={`w-full p-3 mb-6 border rounded ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Re-enter your password"
              required
            />
            {errors.confirmPassword && (
              <p className="text-red-500 mb-3">{errors.confirmPassword}</p>
            )}

            {/* Submit button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-700 transition"
            >
              Register
            </button>

            {/* Social Logins */}
            <div className="flex justify-center gap-4 mt-4">
              <button onClick={handleGoogleRegister} className="btn btn-outline btn-success flex-1">Google</button>
              <button onClick={handleGithub} className="btn btn-outline btn-neutral flex-1">Github</button>
            </div>

            {/* Login Link */}
            <div className="text-center mt-4">
              <NavLink to="/login" className="text-sm text-blue-600 hover:underline">
                Already have an account? Login
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
