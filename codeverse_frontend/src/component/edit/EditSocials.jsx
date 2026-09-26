import React from 'react'
import { FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { RiPagesLine } from "react-icons/ri";
import { useForm } from "react-hook-form";
import { jwtDecode } from 'jwt-decode';
import { updateSocials } from "../../services/api";

const EditSocials = (data) => {
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

      const res = await updateSocials(formdata);
      if (res.status === 200) {
        sessionStorage.removeItem('sessionid');
        alert("data update successfully");
      }
      else alert("something went wrong")

    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <div className='flex justify-center items-center font-Inter text-gray-600 w-full'>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col min-h-full bg-white rounded-lg p-4 md:px-10 md:py-8 border-1 border-gray-200 w-full'>

        {/* header */}
        <div className='flex gap-10 pb-10 justify-between'>
          <div className='flex flex-col'>
            <h3 className='text-xl font-semibold text-black'>Social Media</h3>
            <p className='text-wrap'>Update your social media details here</p>
          </div>
          <div>
            <button disabled={isSubmitting} className='bg-blue-500 rounded-md px-2 py-1 text-white font-semibold hidden md:block'>
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-blue-500 rounded-full animate-spin"></div>
              ) : "Update"}
            </button>
          </div>
        </div>


        <div className='flex flex-wrap flex-col gap-8 w-full '>
          {/* linkedin */}
          <div className='flex flex-col gap-5 w-full'>
            <div className='flex items-center text-lg gap-3'>
              <FaLinkedin className='text-black text-2xl' />
              <label>Linkedin</label>
            </div>
            <div className='flex bg-orange-50 border-1 border-gray-400 rounded p-2 w-full '>
              <span className='text-black'>https://www.linkedin.com/in/</span>
              <input type="text" className='focus:outline-none flex-1 w-full min-w-0' placeholder={data?.data?.linkedin ?? 'username'} {...register('linkedin')} />
            </div>
          </div>

          {/* twitter */}
          <div className='flex flex-col gap-5 w-full'>
            <div className='flex items-center text-lg gap-3'>
              <FaSquareXTwitter className='text-black text-2xl' />
              <label>Twitter</label>
            </div>
            <div className='flex bg-orange-50 border-1 border-gray-400 rounded p-2 w-full'>
              <span className='text-black'>https://www.twitter.com/</span>
              <input type="text" className='focus:outline-none flex-1 w-full min-w-0 ' placeholder={data?.data?.twitter ?? 'username'} {...register('twitter')}/>
            </div>
          </div>

          {/* instagram */}
          <div className='flex flex-col gap-5 w-full '>
            <div className='flex items-center text-lg gap-3 '>
              <FaInstagram className='text-black text-2xl' />
              <span>Instagram</span>
            </div>
            <div className='flex bg-orange-50 border-1 border-gray-400 rounded p-2 w-full'>
              <span className='text-black'>https://www.instagram.com/</span>
              <input type="text" className='focus:outline-none flex-1 w-full min-w-0' placeholder={data?.data?.instagram ?? 'username'} {...register('instagram')}/>
            </div>
          </div>

          {/* facebook */}
          <div className='flex flex-col gap-5 w-full'>
            <div className='flex items-center text-lg gap-3'>
              <FaFacebook className='text-black text-2xl' />
              <span>Facebook</span>
            </div>
            <div className='flex bg-orange-50 border-1 border-gray-400 rounded p-2 w-full'>
              <span className='text-black '>https://www.facebook.com/</span>
              <input type="text" className='focus:outline-none flex-1 w-full min-w-0' placeholder={data?.data?.facebook ?? 'username'} {...register('facebook')}/>
            </div>
          </div>

          {/* resume */}
          <div className='flex flex-col gap-5 w-full'>
            <div className='flex items-center text-lg gap-3'>
              <RiPagesLine className='text-black text-2xl' />
              <label>Resume</label>
            </div>
            <div className='flex gap-1 bg-orange-50 border-1 border-gray-400 rounded p-2 w-full '>
              <span className='text-black'></span>
              <input type="text" className='focus:outline-none flex-1 w-full min-w-0' placeholder={data?.data?.resume ?? 'https://drive.google.com/resume'} {...register('resume')} />
            </div>
          </div>
        </div>

        {/* submit buttons for mobile devices */}
        <div className='self-center mt-10'>
          <button type='submit' disabled={isSubmitting} className='bg-blue-500 rounded-md px-2 py-1 text-white font-semibold md:hidden'>
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white border-t-blue-500 rounded-full animate-spin"></div>
            ) : "Update"}
          </button>
        </div>
      </form>

    </div>
  )
}

export default EditSocials
