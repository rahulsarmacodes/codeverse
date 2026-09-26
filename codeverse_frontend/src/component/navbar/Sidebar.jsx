import React from "react";
import { FaUser, FaCode, FaUsers, FaCog } from "react-icons/fa";

const icons = {
  "Profile Info": <FaUser />,
  "Coding Profiles": <FaCode />,
  Socials: <FaUsers />,
  Account: <FaCog />,
};

const Sidebar = ({ selectedOption, setselectedOption }) => {
  const options = ["Profile Info", "Coding Profiles", "Socials", "Account"];

  return (
    <div className='font-Inter w-full md:w-1/4 md:min-h-screen shrink-0'>
      {/* Mobile Horizontal Tabs */}
      <div className='flex md:hidden overflow-x-auto gap-2 p-2 bg-white rounded-lg shadow-xs mb-3 scrollbar-none'>
        {options.map((option) => (
          <button
            key={option}
            onClick={() => setselectedOption(option)}
            className={`whitespace-nowrap px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 cursor-pointer ${
              selectedOption === option ? "bg-orange text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {icons[option]} <span>{option}</span>
          </button>
        ))}
      </div>

      {/* Desktop Vertical Sidebar */}
      <div className='hidden md:flex flex-col p-6 gap-3 bg-white rounded-lg min-h-full shadow-xs'>
        {options.map((option) => (
          <button
            key={option}
            onClick={() => setselectedOption(option)}
            className={`w-full text-left p-3 rounded-lg font-medium transition cursor-pointer ${
              selectedOption === option ? "bg-orange text-white" : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            <div className='flex items-center gap-3'>
              {icons[option]} <span>{option}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
