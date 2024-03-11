import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../../services/index/users";

import { userActions } from "../../store/reducers/userReducers";

import MainLayout from "../../components/MainLayout";
import clsx from "clsx";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  useEffect(() => {
    if (userState.userInfo) {
      navigate("/");
    }
  }, [navigate, userState.userInfo]);

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ email, password }) => {
      return login({ email, password });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem("account", JSON.stringify(data));
      toast.success("Register successfully.", {
        position: "top-right",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
          border: "2px solid #10b981",
        },
        ariaProps: {
          role: "alert",
          "aria-live": "assertive",
        },
      });
    },
    onError: (error) => {
      toast.error(error.message, {
        position: "top-right",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
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
    // reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },

    mode: "onChange",
  });

  const submitHandler = (data) => {
    const { email, password } = data;
    mutate({ email, password });
  };

  return (
    <MainLayout>
      <section className="container mx-auto px-5 py-10">
        <div className="w-full max-w-sm mx-auto">
          <h1 className="font-roboto text-2xl font-bold text-center text-dark-hard mb-8">
            Login
          </h1>
          <form onSubmit={handleSubmit(submitHandler)}>
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
                className={clsx(
                  "border-b-2 py-4 px-5 block placeholder:text-[#959ead] text-dark-hard mt-3 focus:outline-none transition duration-200 ",
                  errors.email
                    ? "border-red-500 focus:border-red-500"
                    : "border-[#5a7184] focus:border-cyan-500"
                )}
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
                className={clsx(
                  "border-b-2 border-[#5a7184] py-4 px-5 block placeholder:text-[#959ead] text-dark-hard mt-3 focus:outline-none transition duration-200 focus:border-cyan-500",
                  errors.email
                    ? "border-red-500 focus:border-red-500"
                    : "border-[#5a7184] focus:border-cyan-500"
                )}
              />
              {errors.password?.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password?.message}
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
              Sign In
            </button>

            <p className="text-sm font-semibold text-[#5a7184]">
              Do not have an account?{" "}
              <Link to="/register" className="text-primary">
                Register now.
              </Link>
            </p>
          </form>
        </div>
      </section>
    </MainLayout>
  );
};

export default LoginPage;
