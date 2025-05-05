import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { usePost } from "../../api/authapi";
import { toast } from "react-toastify";
import { useUser } from "../Context/UserContext";

const LoginForm = () => {
  const {user,}=useUser()
  const navigate=useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("E-mail is required"),
        password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required")
    }),
    onSubmit:async  (values) => {
      const result=await usePost("/User/Login",values)
       if (result?.statusCode == 200) {
                      toast .success('Login successfull!');
                         navigate("/userlogin")
                         
                  }
                  else {
                      toast.error("Error in Login")
                  }
    }
  });
  

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center px-4">
      {/* Header Strip */}
      <div className="absolute top-0 w-full h-40 bg-gradient-to-r from-[#0b1e75] to-[#2d49f1] -z-10"></div>

      {/* Back Button */}
      <div className="sticky top-4 left-4 self-start z-20">
        <button onClick={()=>navigate("/")} className="bg-black text-white text-sm px-4 py-2 rounded-md flex items-center gap-2">
          <span className="text-lg">←</span> Back to Home
        </button>
      </div>

      {/* Login Card */}
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white shadow-2xl rounded-xl w-full max-w-md p-8 mt-10 z-10"
      >
       <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-[#1E2A78] to-[#384EDE] bg-clip-text text-transparent">
      NEXORA   </h2>
            

        <h3 className="text-2xl font-bold text-center mt-4">Welcome back</h3>
        <p className="text-center text-gray-600 mb-6">
        Sign in to your account        </p>

        <div className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block font-semibold mb-1">E-mail Address</label>
            <input
              type="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="w-full px-4 py-2 rounded-md shadow-sm bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-sm text-red-600 mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block font-semibold mb-1">Password</label>
            <input
              type="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="w-full px-4 py-2 rounded-md shadow-sm bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-sm text-red-600 mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 rounded-md text-white font-bold text-lg bg-gradient-to-r from-[#0b1e75] to-[#2d49f1] hover:opacity-90 transition"
          >
            Sign in
          </button>
        </div>

        {/* Signup Prompt */}
        <p className="text-center mt-6 text-sm">
          No account?
          <a href="/userregistration" className="text-blue-700 hover:underline font-medium">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
