import React from 'react';

const ContestRanking = (data) => {
    const icons = {
        codeforces: 'https://codolio.com/icons/codeforces.png',
        leetcode: 'https://codolio.com/icons/leetcode_light.png',
        codechef: 'https://codolio.com/icons/codechef_light.png',
        gfg: 'https://codolio.com/icons/gfg.png',
    }

  return (
    <div className=" h-full w-full p-10 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Contest Ratings</h2>

      <div className=" flex flex-col space-y-4">
        {data.data.codechef ? 
          (<div className="flex justify-between items-center bg-gray-50 rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
              <img
                src={icons.codechef}
                className="w-6 h-6 object-contain"
              />
              <div>
                <p className="text-base font-semibold text-gray-800">
                  Codechef
                </p>
                <p className="text-sm text-gray-500">{data.data.codechef.rank}</p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-lg font-bold text-gray-900">{data.data.codechef.rating}</p>
            </div>
          </div>) : ''}

          {data.data.gfg ? 
          (<div className="flex justify-between items-center bg-gray-50 rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
              <img
                src={icons.gfg}
                className="w-6 h-6 object-contain"
              />
              <div>
                <p className="text-base font-semibold text-gray-800">
                  GeeksForGeeks
                </p>
                <p className="text-sm text-gray-500">{data.data.gfg.rank}★</p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-lg font-bold text-gray-900">{data.data.gfg.rating}</p>
            </div>
          </div>) : ''}

            {data.data.leetcode ? 
          (<div className="flex justify-between items-center bg-gray-50 rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
              <img
                src={icons.leetcode}
                className="w-6 h-6 object-contain"
              />
              <div>
                <p className="text-base font-semibold text-gray-800">
                  Leetcode
                </p>
                <p className="text-sm text-gray-500">{data.data.leetcode.rank ? data.data.leetcode.rank : ''}</p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-lg font-bold text-gray-900">{parseInt(data.data.leetcode.rating)}</p>
            </div>
          </div>) : ''}

            {data.data.codeforces ? 
          (<div className="flex justify-between items-center bg-gray-50 rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
              <img
                src={icons.codeforces}
                className="w-6 h-6 object-contain"
              />
              <div>
                <p className="text-base font-semibold text-gray-800">
                  Codeforces
                </p>
                <p className="text-sm text-gray-500">{data.data.codeforces.rank}</p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-lg font-bold text-gray-900">{data.data.codeforces.rating}</p>
            </div>
          </div>) : ''}

      </div>
    </div>
  );
};

export default ContestRanking;
