"use client"
import React, { useState } from 'react'
import { signIn } from 'next-auth/react';

export const CredentialsForm = () => {
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

        <form className="space-y-6" onSubmit={handleLogin}>
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                Sign in
            </h5>
            {error !== "" && (
                <div className="text-red-500 text-sm font-medium">{error}</div>
            )}
            <div></div>
            <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Email
                </label>
                <input type="email" name="email" id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="email@vinatea.com" value={formValues.email} onChange={(e) =>
                        setFormValues({ ...formValues, email: e.target.value })
                    }
                    required
                />
            </div>
            <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                </label>
                <input type="password" name="password" id="password" placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    value={formValues.password} minLength={8} onChange={(e) =>
                        setFormValues({ ...formValues, password: e.target.value })
                    }
                    required
                />
            </div>
            <button type="submit" className={`w-full font-semibold text-xs text-white uppercase tracking-widest focus:ring-4
            focus:outline-none focus:ring-blue-300 rounded-full px-5 py-2.5 text-center ${isLoading
                    ? "bg-gray-700 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                    : "bg-[#84593C] hover:bg-[#6E4F34] focus:ring-[#966F4A] dark:bg-[#84593C] dark:hover:bg-[#6E4F34] dark:focus:ring-[#966F4A]"}`}
                disabled={isLoading}>
                Login to your account
            </button>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                Not registered?{" "}
                <a href="#" className="text-blue-700 hover:underline dark:text-blue-500">
                    Create account
                </a>
            </div>
        </form>
    );
}