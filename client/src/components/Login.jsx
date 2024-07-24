import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
// Import the image
import pic from "./pic2.jpg"; // Adjust the path accordingly

function Login() {
  const [authUser, setAuthUser] = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    axios
      .post("/api/user/login", userInfo)
      .then((response) => {
        if (response.data) {
          toast.success("Login successful");
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
    <div className="flex flex-col md:flex-row h-screen">
      {/* Image Section */}
      <div
        className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center bg-white relative"
        style={{
          backgroundColor: "white", // Ensure the background color is white
        }}
      >
        <img
          src={pic}
          alt="Login Background"
          className="object-contain w-full h-full"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </div>
      {/* Form Section */}
      <div className="w-full md:w-1/2 h-full flex items-center justify-center bg-white p-4 md:p-12">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-gray-100 p-8 rounded-lg shadow-lg w-full max-w-md mx-auto space-y-6"
        >
          <h1 className="text-3xl md:text-4xl text-center text-black font-extrabold mb-4">
            Chat<span className="text-gray-800 font-extrabold">App</span>
          </h1>
          <h2 className="text-lg md:text-xl text-center text-black font-semibold mb-6">
            Login to Your Account
          </h2>

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

          {/* Submit Button and Signup Link */}
          <div className="flex flex-col items-center">
            <input
              type="submit"
              value="Login"
              className="bg-red-600 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-red-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <p className="mt-6 text-black">
              New user?{" "}
              <Link
                to="/signup"
                className="text-red-500 underline hover:text-red-600 transition duration-300 ease-in-out"
              >
                Signup
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
