import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { signup } from "../../services/index/users";

import MainLayout from "../../components/MainLayout";

const RegisterPage = () => {
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ name, email, password }) => {
      return signup({ name, email, password });
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success("Register successfully.", {
        position: "top-right",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
          animationDuration: "0.5s",
          border: "2px solid #10b981",
        },
        ariaProps: {
          role: "alert",
          "aria-live": "assertive",
        },
      });
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message, {
        position: "top-right",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
          animationDuration: "0.5s",
          border: "2px solid #ff4b48",
        },
        ariaProps: {
          role: "alert",
          "aria-live": "assertive",
        },
      });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    // reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    mode: "onChange",
  });

  const submitHandler = (data) => {
    const { name, email, password } = data;
    mutate({ name, email, password });
  };

  return (
    <MainLayout>
      <section className="container mx-auto px-5 py-10">
        <div className="w-full max-w-sm mx-auto">
          <h1 className="font-roboto text-2xl font-bold text-center text-dark-hard mb-8">
            Sign up
          </h1>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="flex flex-col mb-6 w-full h-32">
              <label
                htmlFor="name"
                className="text-[#5a7184] font-semibold block"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name", {
                  required: "Name is required.",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters.",
                  },
                })}
                placeholder="Enter name"
                className={`border-b-2 py-4 px-5 block placeholder:text-[#959ead] text-dark-hard mt-3 focus:outline-none transition duration-200  ${
                  errors.name
                    ? "border-red-500 focus:border-red-500"
                    : "border-[#5a7184] focus:border-cyan-500"
                } `}
              />
              {errors.name?.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col mb-6 w-full h-32">
              <label
                htmlFor="email"
                className="text-[#5a7184] font-semibold block"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: "Email is required.",
                  pattern: {
                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Invalid email address.",
                  },
                })}
                placeholder="Enter email"
                className={`border-b-2 py-4 px-5 block placeholder:text-[#959ead] text-dark-hard mt-3 focus:outline-none transition duration-200 ${
                  errors.email
                    ? "border-red-500 focus:border-red-500"
                    : "border-[#5a7184] focus:border-cyan-500"
                }`}
              />
              {errors.email?.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col mb-6 w-full h-32">
              <label
                htmlFor="password"
                className="text-[#5a7184] font-semibold block"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register("password", {
                  required: "Password is required.",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters.",
                  },
                })}
                placeholder="Enter password"
                className={`border-b-2 border-[#5a7184] py-4 px-5 block placeholder:text-[#959ead] text-dark-hard mt-3 focus:outline-none transition duration-200 focus:border-cyan-500 ${
                  errors.email
                    ? "border-red-500 focus:border-red-500"
                    : "border-[#5a7184] focus:border-cyan-500"
                }`}
              />
              {errors.password?.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col mb-6 w-full h-32">
              <label
                htmlFor="confirmPassword"
                className="text-[#5a7184] font-semibold block"
              >
                Confirm password
              </label>
              <input
                type="password"
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: "Confirm password is required.",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match.",
                })}
                placeholder="Enter confirm password"
                className={`border-b-2 border-[#5a7184] py-4 px-5 block placeholder:text-[#959ead] text-dark-hard mt-3 focus:outline-none transition duration-200 focus:border-cyan-500 ${
                  errors.email
                    ? "border-red-500 focus:border-red-500"
                    : "border-[#5a7184] focus:border-cyan-500"
                }`}
              />
              {errors.confirmPassword?.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword?.message}
                </p>
              )}
            </div>
            <Link
              to="/forget-password"
              className="text-sm font-semibold text-primary"
            >
              Forgot password?
            </Link>
            <button
              type="submit"
              disabled={!isValid || isLoading}
              // onClick={() => reset()}
              className="bg-primary text-white font-bold text-lg py-4 px-8 w-full rounded-lg my-6 hover:bg-blue-700 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Register
            </button>

            <p className="text-sm font-semibold text-[#5a7184]">
              You have an account?{" "}
              <Link to="/login" className="text-primary">
                Login now.
              </Link>
            </p>
          </form>
        </div>
      </section>
    </MainLayout>
  );
};

export default RegisterPage;
