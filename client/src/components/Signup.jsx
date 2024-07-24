import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Signup() {
  const [authUser, setAuthUser] = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // Watch the password and confirm password fields
  const password = watch("password", "");
  const confirmPassword = watch("confirmPassword", "");

  const validatePasswordMatch = (value) => {
    return value === password || "Passwords do not match";
  };

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };
    await axios
      .post("/api/user/signup", userInfo)
      .then((response) => {
        if (response.data) {
          toast.success("Signup successful");
        }
        localStorage.setItem("ChatApp", JSON.stringify(response.data));
        setAuthUser(response.data);
      })
      .catch((error) => {
        if (error.response) {
          toast.error("Error: " + error.response.data.error);
        }
      });
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-800">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-12 rounded-2xl shadow-2xl w-full max-w-lg space-y-6"
      >
        <h1 className="text-4xl text-center text-black font-extrabold mb-4">
          Chat<span className="text-gray-800 font-extrabold">App</span>
        </h1>
        <h2 className="text-xl text-center text-black font-semibold mb-6">
          Signup
        </h2>

        {/* Fullname */}
        <div className="flex flex-col">
          <label htmlFor="fullname" className="flex items-center gap-3 text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-6 h-6 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              id="fullname"
              placeholder="Fullname"
              className="border border-gray-300 p-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300 ease-in-out"
              {...register("fullname", { required: true })}
            />
          </label>
          {errors.fullname && (
            <span className="text-red-500 text-sm mt-1">This field is required</span>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email" className="flex items-center gap-3 text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-6 h-6 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="border border-gray-300 p-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300 ease-in-out"
              {...register("email", { required: true })}
            />
          </label>
          {errors.email && (
            <span className="text-red-500 text-sm mt-1">This field is required</span>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label htmlFor="password" className="flex items-center gap-3 text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-6 h-6 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="border border-gray-300 p-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300 ease-in-out"
              {...register("password", { required: true })}
            />
          </label>
          {errors.password && (
            <span className="text-red-500 text-sm mt-1">This field is required</span>
          )}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col">
          <label htmlFor="confirmPassword" className="flex items-center gap-3 text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-6 h-6 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              className="border border-gray-300 p-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300 ease-in-out"
              {...register("confirmPassword", {
                required: true,
                validate: validatePasswordMatch,
              })}
            />
          </label>
          {errors.confirmPassword && (
            <span className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-red-600 text-white py-2 px-4 rounded-lg w-full hover:bg-red-700 transition duration-300 ease-in-out"
        >
          Signup
        </button>

        {/* Redirect to login page */}
        <p className="text-center text-black mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-red-600 font-bold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
