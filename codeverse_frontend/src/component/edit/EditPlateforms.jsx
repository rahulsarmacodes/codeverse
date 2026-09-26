import React from 'react'
import { SiCodechef, SiCodeforces, SiGeeksforgeeks, SiGithub, SiLeetcode } from 'react-icons/si';
import { useForm } from 'react-hook-form'
import { jwtDecode } from "jwt-decode";
import { updateCodingPlatforms } from '../../services/api';

const Plateforms = (data) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (formdata) => {
    try {
      const token = localStorage.getItem("token");
      const decode = jwtDecode(token);
      formdata.username = decode.username;

      const res = await updateCodingPlatforms(formdata);
      if (res.status === 200) {
        sessionStorage.removeItem('sessionid');
        alert("Data updated successfully");
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <div className='font-Inter text-gray-600 w-full'>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col min-h-full bg-white rounded-lg p-4 sm:px-8 sm:py-6 border-1 border-gray-200'>
        <div className='flex gap-4 pb-6 justify-between items-center'>
          <div className='flex flex-col'>
            <h3 className='text-xl font-semibold text-black'>Coding Profiles</h3>
            <p className='text-sm'>Update your coding platform profiles here</p>
          </div>
          <div>
            <button disabled={isSubmitting} className='block bg-blue-500 hover:bg-blue-600 rounded-md px-4 py-1.5 text-white font-semibold transition cursor-pointer'>
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-blue-500 rounded-full animate-spin"></div>
              ) : "Update"}
            </button>
          </div>
        </div>

        <div className='flex flex-wrap flex-col gap-8 w-full'>
          {/* Leetcode */}
          <div className='flex flex-col gap-5 w-full'>
            <div className='flex items-center text-lg gap-3'>
              <SiLeetcode className='text-black text-2xl' />
              <label>Leetcode</label>
            </div>
            <div className='flex bg-orange-50 border-1 border-gray-400 rounded p-2 w-full '>
              <span className='text-black'>https://leetcode.com/u/</span>
              <input type="text" className='focus:outline-none flex-1 w-full min-w-0' {...register('leetcodeusername')} placeholder={(data.data.leetcodeusername != undefined) ? data.data.leetcodeusername : 'username'}/>
            </div>
          </div>

          {/* GFG */}
          <div className='flex flex-col gap-5 w-full'>
            <div className='flex items-center text-lg gap-3'>
              <SiGeeksforgeeks className='text-black text-2xl' />
              <label>Geeks For Geeks</label>
            </div>
            <div className='flex bg-orange-50 border-1 border-gray-400 rounded p-2 w-full '>
              <span className='text-black'>https://www.geeksforgeeks.org/user/</span>
              <input type="text" className='focus:outline-none flex-1 w-full min-w-0' {...register('gfgusername')} placeholder={(data.data.gfgusername != undefined) ? data.data.gfgusername : 'username'}/>
            </div>
          </div>

          {/* Codechef */}
          <div className='flex flex-col gap-5 w-full'>
            <div className='flex items-center text-lg gap-3'>
              <SiCodechef className='text-black text-2xl' />
              <label>Codechef</label>
            </div>
            <div className='flex bg-orange-50 border-1 border-gray-400 rounded p-2 w-full '>
              <span className='text-black'>https://www.codechef.com/users/</span>
              <input type="text" className='focus:outline-none flex-1 w-full min-w-0' {...register('codechefusername')} placeholder={(data.data.codechefusername != undefined) ? data.data.codechefusername : 'username'}/>
            </div>
          </div>

          {/* Codeforces */}
          <div className='flex flex-col gap-5 w-full'>
            <div className='flex items-center text-lg gap-3'>
              <SiCodeforces className='text-black text-2xl' />
              <label>Codeforces</label>
            </div>
            <div className='flex bg-orange-50 border-1 border-gray-400 rounded p-2 w-full '>
              <span className='text-black'>https://codeforces.com/profile/</span>
              <input type="text" className='focus:outline-none flex-1 w-full min-w-0' {...register('codeforcesusername')} placeholder={(data.data.codeforcesusername != undefined) ? data.data.codeforcesusername : 'username'}/>
            </div>
          </div>

          {/* Github */}
          <div className='flex flex-col gap-5 w-full'>
            <div className='flex items-center text-lg gap-3'>
              <SiGithub className='text-black text-2xl' />
              <label>Github</label>
            </div>
            <div className='flex bg-orange-50 border-1 border-gray-400 rounded p-2 w-full '>
              <span className='text-black'>https://github.com/</span>
              <input type="text" className='focus:outline-none flex-1 w-full min-w-0' placeholder='username' />
            </div>
          </div>
        </div>

        {/* Submit button for mobile screens */}
        <div className='self-center mt-10'>
          <button type='submit' disabled={isSubmitting} className='bg-blue-500 rounded-md px-4 py-2 text-white font-semibold md:hidden'>
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white border-t-blue-500 rounded-full animate-spin"></div>
            ) : "Update"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Plateforms;