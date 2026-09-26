import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { jwtDecode } from "jwt-decode";

const Accountinfo = () => {
    const {
      handleSubmit,
      formState: { isSubmitting },
    } = useForm();
  
    const onSubmit = async (data) => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        console.error("Error submitting form", error);
      }
    };

    // Dynamic username from token
    const [activeEdit, setactiveEdit] = useState(false);
    const [userName, setuserName] = useState(() => {
      try {
        const token = localStorage.getItem("token");
        return token ? jwtDecode(token)?.username || "" : "";
      } catch {
        return "";
      }
    });

    const handleEdit = () =>{
      setactiveEdit(true);
    };

    const handleSave = () =>{
      setactiveEdit(false);
    };

    const handleChange = (e) =>{
      setuserName(e.target.value);
    };

  return (
    <div className='flex justify-center items-center font-Inter text-gray-600 w-full'>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col min-h-full bg-white rounded-lg p-4 md:px-10 md:py-8 border-1 border-gray-200 w-full'>

        {/* header */}
        <div className='flex gap-10 pb-10 justify-between'>
          <div className='flex flex-col'>
              <h3 className='text-xl font-semibold text-black'>Your Account</h3>
              <p className='text-wrap'>Update your account details here</p>
          </div>
          <div>
              <button  disabled={isSubmitting} className='bg-blue-500 rounded-md px-2 py-1 text-white font-semibold hidden md:block'>
              {isSubmitting?(
                  <div className="w-5 h-5 border-2 border-white border-t-blue-500 rounded-full animate-spin"></div>
                ): "Update"}
              </button>
          </div>
        </div>
        
        {/* edit username section */}
        <div>
          <div className='flex gap-5'>
            {activeEdit?(
              <>
              <div className='flex gap-2 bg-orange-100 border-1 border-gray-400 rounded p-2'>
                <h3>CodeVerse ID :</h3>
                <input className='focus:outline-none w-fit' type="text" value={userName} onClick={handleChange}  onChange={handleChange}/>
              </div>
              <button type="button" className='flex bg-red-500 text-white font-semibold justify-center items-center p-2 rounded' onClick={handleSave}>Close</button>
              </>
            ):(
              <>
                <div className='flex gap-2 bg-orange-100 border-1 border-gray-400 rounded p-2'>
                  <h3>CodeVerse ID :</h3>
                  <span className=''>{userName}</span>
                </div>
                <button type="button" className='text-blue-600' onClick={handleEdit}>Edit</button>
                
              </>
            )}
          </div>

          <div>
          
          </div>
        </div>
      </form>
      
    </div>
  )
}

export default Accountinfo
