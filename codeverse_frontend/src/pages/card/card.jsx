import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Profile from '../../assets/pimage.png';
import Navbar from '../../component/navbar/Navbar';
import Footer from '../../component/footer/Footer';
import { FaShareAlt } from 'react-icons/fa';
import { getUserProfile } from '../../services/api';

const Card = () => {
  const { username } = useParams();
  const [userdata, setUserdata] = useState(null);
  const [activeDays, setActiveDays] = useState(0);

  const icons = {
    codeforces: 'https://codolio.com/icons/codeforces.png',
    codechef: 'https://codolio.com/icons/codechef_light.png',
    leetcode: 'https://codolio.com/icons/leetcode_light.png',
    gfg: 'https://codolio.com/icons/gfg.png',
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await getUserProfile(username);
        const data = res.data[0];
        setUserdata(data);

        // Count unique active submission days across platforms
        const uniqueDates = new Set();
        if (data?.codingProfiles?.codechef?.heatMap) {
          data.codingProfiles.codechef.heatMap.forEach((item) => uniqueDates.add(item.date));
        }
        if (data?.codingProfiles?.codeforces?.heatMap) {
          data.codingProfiles.codeforces.heatMap.forEach((item) => uniqueDates.add(item.date));
        }
        if (data?.codingProfiles?.gfg?.heatMap) {
          data.codingProfiles.gfg.heatMap.forEach((item) => uniqueDates.add(item.date));
        }
        if (data?.codingProfiles?.leetcode?.userCalendar?.submissionCalendar) {
          try {
            const cal = JSON.parse(data.codingProfiles.leetcode.userCalendar.submissionCalendar);
            Object.keys(cal).forEach((ts) => {
              const d = new Date(parseInt(ts) * 1000).toISOString().split('T')[0];
              uniqueDates.add(d);
            });
          } catch (e) {
            console.error(e);
          }
        }
        setActiveDays(uniqueDates.size);
      } catch (err) {
        console.error('Error fetching user card data:', err);
      }
    };

    if (username) {
      fetchUserData();
    }
  }, [username]);

  // Share card link (Web Share API or clipboard fallback)
  const shareHandler = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'My Codeverse Card',
          text: `Check out ${userdata?.name || username}'s Codeverse profile card!`,
          url: window.location.href,
        })
        .catch((err) => console.log('share failed:', err));
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Card link copied to clipboard!');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex bg-gray-200 min-h-screen justify-center items-center py-20 px-4">
        <div className="flex flex-col bg-white gap-5 p-6 rounded-xl shadow-orange-300 shadow-xl w-full max-w-sm">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">
              <span className="text-3xl font-semibold">Code</span>
              <span className="font-semibold">verse</span>
              <span className="text-orange font-extrabold">&lt;/&gt;</span>
            </div>
            <FaShareAlt
              className="text-slate-500 hover:text-orange cursor-pointer transition-colors"
              onClick={shareHandler}
              title="Share Card"
            />
          </div>

          {/* User Info */}
          <div className="flex flex-col justify-center items-center gap-2">
            <img
              src={userdata?.profilePicture || Profile}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-orange-200"
            />
            <h1 className="text-center text-xl font-bold text-slate-700">
              {userdata?.name || username}
            </h1>
            <p className="text-center font-semibold text-slate-500 bg-orange-300 px-3 py-0.5 rounded-full text-sm">
              @{userdata?.username || username}
            </p>
          </div>

          {/* Question Solved & Active Days */}
          <div className="flex gap-4 justify-center">
            <div className="flex-1 flex flex-col justify-center items-center border-2 border-gray-200 p-2 rounded-md">
              <h2 className="font-semibold text-orange-400 text-sm">Question Solved</h2>
              <hr className="text-gray-300 p-1 w-full" />
              <p className="font-bold text-slate-600 text-lg">
                {userdata?.totalProblemsSolved || 0}
              </p>
            </div>
            <div className="flex-1 flex flex-col justify-center items-center border-2 border-gray-200 p-2 rounded-md">
              <h2 className="font-semibold text-green-500 text-sm">Active Days</h2>
              <hr className="text-gray-200 p-1 w-full" />
              <p className="font-bold text-slate-600 text-lg">{activeDays}</p>
            </div>
          </div>

          {/* Platforms */}
          <div className="p-3 flex flex-col items-center rounded-xl border-2 border-gray-200">
            <h2 className="font-semibold text-sm text-slate-600">You can find me on...</h2>
            <hr className="text-gray-200 p-1 w-full my-1" />
            <div className="flex gap-4 p-2 justify-center items-center">
              {userdata?.gfgusername && (
                <a
                  href={`https://www.geeksforgeeks.org/user/${userdata.gfgusername}`}
                  target="_blank"
                  rel="noreferrer"
                  title="GeeksforGeeks"
                >
                  <img src={icons.gfg} alt="GFG" className="h-6 w-6 hover:scale-110 transition-transform" />
                </a>
              )}
              {userdata?.leetcodeusername && (
                <a
                  href={`https://leetcode.com/u/${userdata.leetcodeusername}`}
                  target="_blank"
                  rel="noreferrer"
                  title="LeetCode"
                >
                  <img src={icons.leetcode} alt="LeetCode" className="h-6 w-6 hover:scale-110 transition-transform" />
                </a>
              )}
              {userdata?.codechefusername && (
                <a
                  href={`https://www.codechef.com/users/${userdata.codechefusername}`}
                  target="_blank"
                  rel="noreferrer"
                  title="CodeChef"
                >
                  <img src={icons.codechef} alt="CodeChef" className="h-6 w-6 hover:scale-110 transition-transform" />
                </a>
              )}
              {userdata?.codeforcesusername && (
                <a
                  href={`https://codeforces.com/profile/${userdata.codeforcesusername}`}
                  target="_blank"
                  rel="noreferrer"
                  title="Codeforces"
                >
                  <img src={icons.codeforces} alt="Codeforces" className="h-6 w-6 hover:scale-110 transition-transform" />
                </a>
              )}
              {!userdata?.gfgusername &&
                !userdata?.leetcodeusername &&
                !userdata?.codechefusername &&
                !userdata?.codeforcesusername && (
                  <span className="text-xs text-gray-400">No platforms linked yet</span>
                )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Card;