import { Link, useNavigate } from "react-router-dom";
import Footer from "../../component/footer/Footer";
import { useForm } from "react-hook-form";
import dog from "../../assets/dog.gif";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

import { signinUser } from "../../services/api";

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      const decode = jwtDecode(localStorage.getItem('token'));
      navigate(`/profile/${decode.username}`);
    }
  }, [])
  //react-hook-form(library)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  //onSubmit function to simulate delay
  const onSubmit = async (data) => {
    try {
      const res = await signinUser(data);
      if (res.status === 200) {
        localStorage.setItem("token", res.data);
        const decode = jwtDecode(res.data);
        navigate(`/profile/${decode.username}`);
      }
    }
    catch (error) {
      const msg = error.response?.data || error.message || "Failed to sign in";
      alert(`Error: ${msg}`);
      console.error("Error submitting form", error);
    }
  };

  return (
    <div className="flex flex-col font-Inter text-sm min-h-screen w-full">
      <div className="flex justify-center items-center flex-grow">
        {/* left */}
        <div className="w-full lg:w-1/2 flex justify-center items-center p-4 sm:p-8">
          <div className="w-full max-w-[440px]">
            <h1 className="font-bold text-2xl">Sign in</h1>
            <div className="flex gap-1">
              <p className="text-slate-600 ">Don't have an account yet?</p>
              <Link to="/signup" className="text-blue-700 font-semibold">
                Sign up here
              </Link>
            </div>
            <hr className="text-slate-200 mt-2" />

            <form action="" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 pt-5">
              <div className="flex flex-col gap-1">
                <label type="email" className="font-semibold text-slate-600">Email Address</label>
                <input type="text" {...register("email", { required: { value: true, message: "Email is required", }, maxLength: { value: 40, message: "enter valid email address", }, })} placeholder="Enter Email Address" className="p-3 border-slate-200 border-1 focus:outline-none rounded-lg w-full" />
                {errors.email && (<span className="text-red-600 text-sm px-2">{errors.email.message}</span>)}
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-blue-700 font-semibold">
                  <label htmlFor="email" className="font-semibold text-slate-600">Password</label>
                  <Link to="">Forgot password?</Link>
                </div>

                <input type="password" {...register("password", { required: { value: true, message: "this field is required" }, minLength: { value: 8, message: "enter a valid password" }, maxLength: { value: 20, message: "maximum 20 characters allowed" } })} placeholder="Enter Password" className="p-3 border-slate-200 border-1 focus:outline-none rounded-lg w-full" />
                {errors.password && (<span className="text-red-600 text-sm p-2"> {errors.password.message}</span>)}

              </div>
              <button type="submit" disabled={isSubmitting} className="bg-orange text-white p-3 rounded-lg font-semibold w-full">Sign In</button>
              {isSubmitting && (<div className="text-orange self-center text-sm font-semibold">Signing in...</div>)}

            </form>

            <div className="flex items-center gap-4 p-2">
              <hr className="flex-grow border-t border-gray-300 " />
              <span>Or continue with</span>
              <hr className="flex-grow border-t border-gray-300" />
            </div>

            <div className="flex justify-center items-center gap-5 border-1 border-gray-200 hover:bg-blue-50  py-2 rounded-lg hover:cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
              </svg>
              <span>Sign in with Google</span>
            </div>

            <p className="text-sm text-gray-600 text-center mt-4 whitespace-normal">By signing in or creating an account, you are agreeing to our
              <a href="/terms" className="text-blue-600 hover:underline mx-1">Terms & Conditions</a>and our
              <a href="/privacy" className="text-blue-600 hover:underline ml-1">Privacy Policy</a>.
            </p>
          </div>
        </div>

        {/* rightpart */}
        <div className="w-1/2 h-screen bg-orange flex flex-col hidden lg:flex justify-evenly items-center relative ">
          {/* dog gif */}
          <div>
            <img
              className="absolute mx-auto top-6 -left-24 z-1 hidden lg:block  -rotate-[30deg] h-auto border-gray-300 dark:border-y-darkBorder-700"
              src={dog}
              alt="dog"
            />
          </div>
          <h3 className='text-4xl text-white font-semibold whitespace-nowrap'>Welcome to Codeverse</h3>
          <div className='flex gap-4 justify-center items-center'>
            <div>
              <i className="fa-solid fa-table-cells-large bg-white text-orange text-4xl p-10 rounded-2xl"></i>
            </div>
            <div className='flex flex-col gap-2'>
              <h3 className='text-2xl font-semibold text-white'>Unified Dashboard</h3>
              <p className='text-gray-200 text-lg w-[350px] leading-tight '>View all your coding profiles in one elegant dashboard with real-time updates across platforms.</p>
            </div>
          </div>

          <div className='flex gap-4 justify-center items-center'>
            <div>
              <i className="fa-solid fa-chart-line bg-white text-orange text-4xl p-10 rounded-2xl"></i>
            </div>
            <div className='flex flex-col gap-2'>
              <h3 className='text-lg font-semibold text-white'>Progress Tracking</h3>
              <p className='text-gray-200 text-lg w-[350px] leading-tight'>Monitor your growth over time with beautiful visualizations and insightful analytics.</p>
            </div>
          </div>

          <div className='flex gap-4 justify-center items-center'>
            <div>
              <i className="fa-solid fa-layer-group bg-white text-orange text-4xl p-10 rounded-2xl"></i>
            </div>
            <div className='flex flex-col gap-2'>
              <h3 className='text-lg font-semibold text-white'>Multi-Platform Support</h3>
              <p className='text-gray-200 text-lg w-[350px] leading-tight'>Support for Codeforces, CodeChef, LeetCode, and GeeksforGeeks with more coming soon.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
