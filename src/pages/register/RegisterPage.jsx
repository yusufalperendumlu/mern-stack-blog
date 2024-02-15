import React from "react";
import { Link } from "react-router-dom";

import MainLayout from "../../components/MainLayout";

const RegisterPage = () => {
  const submitHandler = () => {};

  return (
    <MainLayout>
      <section className="container mx-auto px-5 py-10">
        <div className="w-full max-w-sm mx-auto">
          <h1 className="font-roboto text-2xl font-bold text-center text-dark-hard mb-8">
            Sign up
          </h1>
          <form onSubmit={submitHandler}>
            <div className="flex flex-col mb-6 w-full">
              <label
                htmlFor="name"
                className="text-[#5a7184] font-semibold block"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter name"
                class="border-b-2 border-[#5a7184] py-4 px-5 block placeholder:text-[#959ead] text-dark-hard mt-3 focus:outline-none transition duration-200 focus:border-cyan-500"
              />
            </div>
            <div className="flex flex-col mb-6 w-full">
              <label
                htmlFor="email"
                className="text-[#5a7184] font-semibold block"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                placeholder="Enter email"
                class="border-b-2 border-[#5a7184] py-4 px-5 block placeholder:text-[#959ead] text-dark-hard mt-3 focus:outline-none transition duration-200 focus:border-cyan-500"
              />
            </div>
            <div className="flex flex-col mb-6 w-full">
              <label
                htmlFor="password"
                className="text-[#5a7184] font-semibold block"
              >
                Password
              </label>
              <input
                type="text"
                id="password"
                placeholder="Enter password"
                class="border-b-2 border-[#5a7184] py-4 px-5 block placeholder:text-[#959ead] text-dark-hard mt-3 focus:outline-none transition duration-200 focus:border-cyan-500"
              />
            </div>
            <div className="flex flex-col mb-6 w-full">
              <label
                htmlFor="confirmPassword"
                className="text-[#5a7184] font-semibold block"
              >
                Confirm password
              </label>
              <input
                type="text"
                id="confirmPassword"
                placeholder="Enter confirm password"
                class="border-b-2 border-[#5a7184] py-4 px-5 block placeholder:text-[#959ead] text-dark-hard mt-3 focus:outline-none transition duration-200 focus:border-cyan-500"
              />
            </div>
          </form>
          <Link
            to="/forget-password"
            className="text-sm font-semibold text-primary"
          >
            Forgot password?
          </Link>
          <button
            type="submit"
            className="bg-primary text-white font-bold text-lg py-4 px-8 w-full rounded-lg my-6 hover:bg-blue-700 transition-all duration-300"
          >
            Register
          </button>
          <p className="text-sm font-semibold text-[#5a7184]">
            You have an account?{" "}
            <Link to="/login" className="text-primary">
              Login now.
            </Link>
          </p>
        </div>
      </section>
    </MainLayout>
  );
};

export default RegisterPage;
