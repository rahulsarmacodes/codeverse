import React, { useState, useEffect } from 'react'
import profile from '../../../src/assets/pimage.png'
import { useForm } from "react-hook-form";
import { jwtDecode } from 'jwt-decode';
import { updatePersonalDetails } from '../../services/api';

const EditUser = (data) => {
    const [userToken, setUserTokenData] = useState({});

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decode = jwtDecode(token);
            setUserTokenData(decode);
        }
    }, [])

    //react-hook-form(library)
    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm();

    const onSubmit = async (formdata) => {
        try {
            formdata.username = userToken.username;
            const res = await updatePersonalDetails(formdata);
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
        <div className='font-Inter text-gray-600 w-full'>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col min-h-full bg-white rounded-lg p-4 sm:px-8 sm:py-6 border-1 border-gray-200'>
                <div className='flex gap-4 pb-6 justify-between items-center'>
                    <div className='flex flex-col'>
                        <h3 className='text-xl font-semibold text-black'>User Info</h3>
                        <p className='text-sm'>Manage your info here</p>
                    </div>
                    <div>
                        <button disabled={isSubmitting} className='block bg-blue-500 hover:bg-blue-600 rounded-md px-4 py-1.5 text-white font-semibold transition cursor-pointer'>
                            {isSubmitting ? (
                                <div className="w-5 h-5 border-2 border-white border-t-blue-500 rounded-full animate-spin"></div>
                            ) : "Update"}
                        </button>
                    </div>
                </div>
                <h3 className='text-lg font-semibold text-black'>User Details</h3>

                <div className='flex flex-col lg:flex-row gap-10 pt-5 w-full justify-center items-center'>
                    {/* profile image */}
                    <div className='flex justify-center items-center w-32 relative '>
                        <div className='absolute bg-blue-500 rounded-full px-2 py-1 left-22 top-18 text-sm hidden lg:block'><i className="fa-solid fa-trash text-white"></i></div>
                        <div className='absolute bg-blue-500 rounded-full px-2 py-1 right-22 top-18 text-sm hidden lg:block'><i className="fa-solid fa-xmark text-white"></i></div>
                        <img src={profile} alt="" className=' rounded-full w-32' />
                    </div>

                    {/* id,firstname,lastname */}
                    <div className='flex flex-col gap-3 w-full'>
                        <div className='flex gap-2 '>
                            <h3>CodeVerse ID :</h3>
                            <span className='font-semibold'>{userToken.username}</span>
                        </div>

                        <div className='flex flex-col gap-1 w-full'>
                            <label className='font-semibold after:ml-0.5 after:text-red-500 after:content-["*"]'>Name</label>
                            <input type="text" name='' placeholder={data.data.name} className='focus:outline-none border-1 border-gray-200 p-2 rounded-md w-full' {...register('name')} />
                        </div>
                    </div>
                </div>

                {/* Email,Bio,Country */}
                <div className='flex flex-col gap-5 pt-8'>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="email" className='font-semibold'>Email</label>
                        <div className='bg-gray-100 p-2 border-1 border-gray-300 rounded-md '>{userToken.email}</div>
                    </div>

                    <div className='flex flex-col gap-1 w-full'>
                        <label htmlFor="About" className='font-semibold'>About(max 200 characters)</label>
                        <textarea type="text" className='p-3 h-25 resize-none border-2 border-gray-200 focus:outline-none rounded-md' placeholder={data.data.about} {...register('about')} />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label htmlFor="country" className='font-semibold after:ml-0.5 after:text-red-500 after:content-["*"] '>Country</label>
                        <select name="country" id="country" className="focus:outline-none border-1 border-gray-200 p-2 w-full rounded-md" placeholder={data.data.country} {...register('country')}>
                            <option >{data.data.country ? data.data.country : "Select a country"}</option>
                            <option value="Afghanistan">Afghanistan</option>
                            <option value="Albania">Albania</option>
                            <option value="Algeria">Algeria</option>
                            <option value="Andorra">Andorra</option>
                            <option value="Angola">Angola</option>
                            <option value="Argentina">Argentina</option>
                            <option value="Armenia">Armenia</option>
                            <option value="Australia">Australia</option>
                            <option value="Austria">Austria</option>
                            <option value="Azerbaijan">Azerbaijan</option>
                            <option value="Bahrain">Bahrain</option>
                            <option value="Bangladesh">Bangladesh</option>
                            <option value="Belarus">Belarus</option>
                            <option value="Belgium">Belgium</option>
                            <option value="Belize">Belize</option>
                            <option value="Benin">Benin</option>
                            <option value="Bhutan">Bhutan</option>
                            <option value="Bolivia">Bolivia</option>
                            <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                            <option value="Brazil">Brazil</option>
                            <option value="Bulgaria">Bulgaria</option>
                            <option value="Canada">Canada</option>
                            <option value="China">China</option>
                            <option value="Colombia">Colombia</option>
                            <option value="Croatia">Croatia</option>
                            <option value="Cuba">Cuba</option>
                            <option value="Denmark">Denmark</option>
                            <option value="Egypt">Egypt</option>
                            <option value="Finland">Finland</option>
                            <option value="France">France</option>
                            <option value="Germany">Germany</option>
                            <option value="India">India</option>
                            <option value="Indonesia">Indonesia</option>
                            <option value="Iran">Iran</option>
                            <option value="Iraq">Iraq</option>
                            <option value="Ireland">Ireland</option>
                            <option value="Italy">Italy</option>
                            <option value="Japan">Japan</option>
                            <option value="Kenya">Kenya</option>
                            <option value="Malaysia">Malaysia</option>
                            <option value="Mexico">Mexico</option>
                            <option value="Nepal">Nepal</option>
                            <option value="Netherlands">Netherlands</option>
                            <option value="New Zealand">New Zealand</option>
                            <option value="Nigeria">Nigeria</option>
                            <option value="Norway">Norway</option>
                            <option value="Pakistan">Pakistan</option>
                            <option value="Philippines">Philippines</option>
                            <option value="Russia">Russia</option>
                            <option value="Saudi Arabia">Saudi Arabia</option>
                            <option value="Singapore">Singapore</option>
                            <option value="South Africa">South Africa</option>
                            <option value="Spain">Spain</option>
                            <option value="Sri Lanka">Sri Lanka</option>
                            <option value="Sweden">Sweden</option>
                            <option value="Switzerland">Switzerland</option>
                            <option value="Thailand">Thailand</option>
                            <option value="Turkey">Turkey</option>
                            <option value="Ukraine">Ukraine</option>
                            <option value="United Arab Emirates">United Arab Emirates</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="United States">United States</option>
                            <option value="Vietnam">Vietnam</option>
                        </select>
                    </div>
                </div>

                {/* Educational Details */}
                <div className='flex flex-col gap-5 pt-20'>
                    <h3 className='text-xl font-semibold text-black'>Educational Details</h3>
                    <div className='flex flex-col gap-1'>
                        <label className='font-semibold after:ml-0.5 after:text-red-500 after:content-["*"]'>College</label>
                        <input type="text" className='focus:outline-none border-1 border-gray-200 p-2 rounded-md w-full' placeholder={data.data.institute != undefined ? data.data.institute : "Enter institute name"} {...register('institute')} />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label className='font-semibold after:ml-0.5 after:text-red-500 after:content-["*"]'>Degree</label>
                        <select name="degree" id="degree" className='focus:outline-none border-1 border-gray-200 p-2 rounded-md w-full' placeholder={data.data.degree} {...register('degree')}>
                            <option value="">{data.data.degree ? data.data.degree : "Select a degree"}</option>
                            <option value="Bachelor Of Technology">Bachelor Of Technology</option>
                            <option value="Masters Of Technology">Masters Of Technology</option>
                            <option value="Bachelor Of Computer Application">Bachelor Of Computer Application</option>
                            <option value="Masters Of Computer Application">Masters Of Computer Application</option>
                            <option value="Bachelor Of Science">Bachelor Of Science</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label className='font-semibold after:ml-0.5 after:text-red-500 after:content-["*"]'>Branch</label>
                        <select name="branch" id="branch" className='focus:outline-none border-1 border-gray-200 p-2 rounded-md w-full' placeholder={data.data.branch} {...register('branch')}>
                            <option value="">{data.data.branch ? data.data.branch : "Select a branch"}</option>
                            <option value="Computer Science & Engineering (CSE)">Computer Science & Engineering (CSE)</option>
                            <option value="Information Technology (IT)">Information Technology (IT)</option>
                            <option value="Electronics & Communication Engineering (ECE)">Electronics & Communication Engineering (ECE)</option>
                            <option value="Electrical Engineering (EE)">Electrical Engineering (EE)</option>
                            <option value="Mechanical Engineering (ME)">Mechanical Engineering (ME)</option>
                            <option value="Civil Engineering (CE)">Civil Engineering (CE)</option>
                            <option value="Aeronautical Engineering">Aeronautical Engineering</option>
                            <option value="Automobile Engineering">Automobile Engineering</option>
                            <option value="Biotechnology Engineering">Biotechnology Engineering</option>
                            <option value="Chemical Engineering">Chemical Engineering</option>
                            <option value="Environmental Engineering">Environmental Engineering</option>
                            <option value="Artificial Intelligence & Data Science">Artificial Intelligence & Data Science</option>
                            <option value="Machine Learning & AI">Machine Learning & AI</option>
                            <option value="Robotics Engineering">Robotics Engineering</option>
                            <option value="Nanotechnology Engineering">Nanotechnology Engineering</option>
                            <option value="Mechatronics Engineering">Mechatronics Engineering</option>
                            <option value="Textile Engineering">Textile Engineering</option>
                            <option value="Marine Engineering">Marine Engineering</option>
                            <option value="Petroleum Engineering">Petroleum Engineering</option>
                            <option value="Mining Engineering">Mining Engineering</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label className='font-semibold'>Year of passing</label>
                        <select name="year" id="year" className="focus:outline-none border-1 border-gray-200 p-2 rounded-md w-full" placeholder={data.data.yearofpass} {...register('yearofpass')}>
                            <option value="">{data.data.yearofpass ? data.data.yearofpass : "Select year of passing"}</option>
                            <option value="2030">2030</option>
                            <option value="2029">2029</option>
                            <option value="2028">2028</option>
                            <option value="2027">2027</option>
                            <option value="2026" selected>2026</option>
                            <option value="2025">2025</option>
                            <option value="2024">2024</option>
                            <option value="2023">2023</option>
                            <option value="2022">2022</option>
                            <option value="2021">2021</option>
                            <option value="2020">2020</option>
                            <option value="2019">2019</option>
                            <option value="2018">2018</option>
                            <option value="2017">2017</option>
                            <option value="2016">2016</option>
                            <option value="2015">2015</option>
                            <option value="2014">2014</option>
                            <option value="2013">2013</option>
                            <option value="2012">2012</option>
                            <option value="2011">2011</option>
                            <option value="2010">2010</option>
                            <option value="2009">2009</option>
                            <option value="2008">2008</option>
                            <option value="2007">2007</option>
                            <option value="2006">2006</option>
                            <option value="2005">2005</option>
                            <option value="2004">2004</option>
                            <option value="2003">2003</option>
                            <option value="2002">2002</option>
                            <option value="2001">2001</option>
                            <option value="2000">2000</option>
                            <option value="1999">1999</option>
                            <option value="1998">1998</option>
                            <option value="1997">1997</option>
                            <option value="1996">1996</option>
                            <option value="1995">1995</option>
                            <option value="1994">1994</option>
                            <option value="1993">1993</option>
                            <option value="1992">1992</option>
                            <option value="1991">1991</option>
                            <option value="1990">1990</option>
                            <option value="1989">1989</option>
                            <option value="1988">1988</option>
                            <option value="1987">1987</option>
                            <option value="1986">1986</option>
                            <option value="1985">1985</option>
                            <option value="1984">1984</option>
                            <option value="1983">1983</option>
                            <option value="1982">1982</option>
                            <option value="1981">1981</option>
                            <option value="1980">1980</option>
                            <option value="1979">1979</option>
                            <option value="1978">1978</option>
                            <option value="1977">1977</option>
                            <option value="1976">1976</option>
                            <option value="1975">1975</option>
                            <option value="1974">1974</option>
                            <option value="1973">1973</option>
                            <option value="1972">1972</option>
                            <option value="1971">1971</option>
                            <option value="1970">1970</option>
                        </select>
                    </div>
                </div>
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

export default EditUser
