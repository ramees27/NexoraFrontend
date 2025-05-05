import { useFormik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { usePost } from '../../api/authapi';
import { toast } from 'react-toastify';

const UserRegistration = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            userName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            userName: Yup.string()
                .matches(/^\S+$/, "Username must not contain spaces")
                .min(4, "Username must be at least 4 characters")
                .required("User Name is required"),

            email: Yup.string()
                .email("Invalid email format")
                .required("E-mail is required"),
            password: Yup.string()
                .min(8, "Password must be at least 8 characters")
                .required("Password is required"),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref("password"), null], "Passwords must match")
                .required("Confirm Password is required"),
        }),
        onSubmit: async (values) => {
            const { confirmPassword, ...datasend } = values;

            const result = await usePost("/User/register", datasend);
            console.log(result);
            if (result?.statusCode == 200) {
                toast.success('Registered successfully!');
                   navigate("/")
            }
            else {
                toast.error("Error in Registration")
            }


        },
    });


    return (
        <div className="min-h-screen sm:min-h-[80vh] flex flex-col justify-center items-center px-4 bg-white">

            {/* Header Strip */}
            <div className="absolute top-0 w-full h-40 bg-gradient-to-r from-[#0b1e75] to-[#2d49f1] -z-10"></div>

            {/* Back Button */}
            <div className="sticky top-4 left-4 self-start z-20">
                <button onClick={() => navigate("/")} className="bg-black text-white text-sm px-4 py-2 rounded-md flex items-center gap-2">
                    <span className="text-lg">←</span> Back to Home
                </button>
            </div>

            {/* Form Card */}
            <form
                onSubmit={formik.handleSubmit}
                className="bg-white shadow-2xl rounded-xl w-full max-w-md p-8 z-10 "
            >
                <h2 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#1E2A78] to-[#384EDE]">
                    NEXORA
                </h2>
                <h3 className="text-2xl font-bold text-center ">
                    Create an account
                </h3>
                <p className="text-center text-gray-600 mb-3">
                    Enter your information to create your account
                </p>

                <div className="space-y-4">
                    {/* Username */}
                    <div>
                        <label className="block font-semibold mb-1">User Name</label>
                        <input
                            type="text"
                            name="userName"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.userName}
                            className="w-full px-4 py-2 rounded-md shadow bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your name"
                        />
                        {formik.touched.userName && formik.errors.userName && (
                            <p className="text-sm text-red-600 ">
                                {formik.errors.userName}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block font-semibold mb-1">E-mail Address</label>
                        <input
                            type="email"
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            className="w-full px-4 py-2 rounded-md shadow bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                        />
                        {formik.touched.email && formik.errors.email && (
                            <p className="text-sm text-red-600 ">
                                {formik.errors.email}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block font-semibold mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            className="w-full px-4 py-2 rounded-md shadow bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                        />
                        {formik.touched.password && formik.errors.password && (
                            <p className="text-sm text-red-600">
                                {formik.errors.password}
                            </p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block font-semibold mb-1">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.confirmPassword}
                            className="w-full px-4 py-2 rounded-md shadow bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Confirm your password"
                        />
                        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                            <p className="text-sm text-red-600 mt-1">
                                {formik.errors.confirmPassword}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-2 rounded-md text-white font-bold text-lg bg-gradient-to-r from-[#1E2A78] to-[#384EDE] hover:opacity-90 transition"
                    >
                        Create Account
                    </button>
                </div>

                {/* Sign in link */}
                <p className="text-center mt-1 text-sm">
                    Already have an account?{" "}
                    <a href="/userlogin" className="text-blue-700 hover:underline font-medium">
                        Sign in
                    </a>
                </p>
            </form>

            {/* Terms & Privacy */}
            <p className="text-sm text-center mt-3 max-w-md text-gray-800">
                By clicking "Create Account", you agree to our{" "}
                <a href="#" className="text-black underline font-medium">
                    Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-black underline font-medium">
                    Privacy Policy
                </a>
                .
            </p>
        </div>
    )
}

export default UserRegistration