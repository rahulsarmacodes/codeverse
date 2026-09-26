import React from 'react';

const ScalatonLoading = () => {
  return (
    <div className="font-Inter animate-pulse">
      <div className="flex flex-col md:flex-row p-4 sm:p-6 md:p-10 bg-gray-100 gap-6 justify-center pt-20 sm:pt-22 md:pt-22">
        {/* Left Card Skeleton */}
        <div className='flex flex-col items-center rounded-xl bg-white p-8 shadow-md w-full md:w-80 h-[800px]'>
          <div className='h-32 w-32 rounded-full bg-gray-300'></div>
          <div className='h-6 w-40 bg-gray-300 mt-5'></div>
          <div className='h-4 w-24 bg-gray-300 mt-2'></div>
          <div className='h-4 w-32 bg-gray-300 mt-4'></div>
          
          <div className='h-10 w-full bg-gray-300 mt-4 rounded-md'></div>
          <div className='w-full h-px bg-gray-300 my-4'></div>
          
          <div className='flex gap-4 w-full justify-center'>
            {[...Array(5)].map((_, i) => (
              <div key={i} className='h-8 w-8 bg-gray-300 rounded-full'></div>
            ))}
          </div>
          
          <div className='w-full h-px bg-gray-300 my-4'></div>
          
          <div className='flex flex-col gap-3 w-full'>
            <div className='h-4 w-full bg-gray-300'></div>
            <div className='h-4 w-full bg-gray-300'></div>
            <div className='h-4 w-full bg-gray-300'></div>
          </div>
          
          <div className='w-full h-px bg-gray-300 my-4'></div>
          
          <div className='w-full flex flex-col gap-4'>
            <div className='h-10 w-full bg-gray-300 rounded-md'></div>
            <div className='h-10 w-full bg-gray-300 rounded-md'></div>
          </div>
        </div>

        {/* Right Content Skeleton */}
        <div className='flex flex-col gap-5 w-full lg:w-3/4'>
          {/* First Row - 3 Cards */}
          <div className='w-full flex flex-wrap gap-5'>
            <div className='w-full sm:w-[calc(33%-1rem)] h-40 bg-gray-300 rounded-xl'></div>
            <div className='w-full sm:w-[calc(33%-1rem)] h-40 bg-gray-300 rounded-xl'></div>
            <div className='w-full sm:w-[calc(33%-1rem)] h-40 bg-gray-300 rounded-xl'></div>
          </div>

          {/* Second Row - 2 Cards */}
          <div className='w-full flex flex-wrap gap-5'>
            <div className='w-full md:w-[calc(50%-1rem)] h-64 bg-gray-300 rounded-xl'></div>
            <div className='w-full md:w-[calc(50%-1rem)] h-64 bg-gray-300 rounded-xl'></div>
          </div>

          {/* Pie Charts Skeleton */}
          <div className='flex flex-wrap bg-white justify-evenly shadow-md rounded-2xl pb-5'>
            <div className='h-64 w-64 bg-gray-300 rounded-full m-4'></div>
            <div className='h-64 w-64 bg-gray-300 rounded-full m-4'></div>
          </div>
          
          {/* Topic Wise Skeleton */}
          <div className='h-64 bg-gray-300 rounded-2xl'></div>
        </div>
      </div>
      
      {/* Footer Skeleton */}
      <div className='h-20 bg-gray-200 w-full'></div>
    </div>
  );
};

export default ScalatonLoading;