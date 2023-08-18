"use client";
import { signIn } from "next-auth/react";
import React, { useState } from "react";

export default function Login() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setFormValues({ email: "", password: "" });
    const result = await signIn("credentials", {
      email: formValues.email,
      password: formValues.password,
      redirect: false,
      callbackUrl: "http://localhost:3001/",
    });
    console.log(result)
    if (result?.error) {
      console.log(result.error);
      if (result.error === "401") {
        setError("Invalid credentials");
      }
    } else {
      window.location.href = "/";
    }
    setIsLoading(false);
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" onSubmit={handleLogin}>
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            Sign in
          </h5>
          {error !== "" && (
            <div className="text-red-500 text-sm font-medium">{error}</div>
          )}
          <div></div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="name@company.com"
              value={formValues.email}
              onChange={(e) =>
                setFormValues({ ...formValues, email: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              value={formValues.password}
              minLength={8}
              onChange={(e) =>
                setFormValues({ ...formValues, password: e.target.value })
              }
              required
            />
          </div>
          <div className="flex items-start">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                />
              </div>
              <label
                htmlFor="remember"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Remember me
              </label>
            </div>
            <a
              href="#"
              className="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
            >
              Lost Password?
            </a>
          </div>
          <button
            type="submit"
            className={`w-full text-whit focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  ${isLoading
              ? "bg-gray-700 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              : "bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              }`}
            disabled={isLoading}
          >
            Login to your account
          </button>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered?{" "}
            <a
              href="#"
              className="text-blue-700 hover:underline dark:text-blue-500"
            >
              Create account
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
