import React, { useEffect, useState } from 'react'
import { FaLinkedin, FaFacebook, FaInstagram, FaShare } from "react-icons/fa";
import { FaRankingStar, FaSquareXTwitter } from "react-icons/fa6";
import { RiPagesLine } from "react-icons/ri";
import profile from '../../../src/assets/pimage.png'
import Navbar from '../../component/navbar/Navbar'
import Heatmap from '../../component/heatmap/Heatmap'
import PieChartCP from '../../component/pieChartCP/PieChartCP'
import Piechart from '../../component/pieChartGL/Piechart'
import Graph from '../../component/graph/Graph'
import Footer from '../../component/footer/Footer'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import arrow from '../../assets/up-arrow.svg';
import { MdLink, MdScoreboard, MdVerified } from 'react-icons/md';
import TopicWiseProblem from '../../component/topicwiseProblems/TopicWiseProblem';
import ContestRanking from '../../component/contestRanking/ContestRanking';
import ScalatonLoading from '../../component/ScalatonLoading/ScalatonLoading';
import { getUserProfile, syncUserProfile } from '../../services/api';

const Profile = () => {
  // navigate
  const Navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userdata, setUserData] = useState({});
  const [showStats, setshowStats] = useState(true);
  const [problemSolved, setProblemSolved] = useState(0);
  const [piChartCP, setPiChartCP] = useState({
    codechefCount: 0,
    codeforcesCount: 0,
    leetcodeCount: 0,
    gfgCount: 0
  });
  const [pieChartGL, setPieChartGL] = useState({
    easy: 0,
    medium: 0,
    hard: 0
  });
  const [topicWiseProbles, setTopicWiseProbles] = useState(0);
  const [editAccess, setEditAccess] = useState(false);
  const [connectPro, setConnectPro] = useState(true);
  const [social, setSocial] = useState({});
  const [heatmaps, setHeatmaps] = useState({});
  const [activeDays, setActiveDays] = useState(0)
  const [contesRating, setContestRating] = useState({});
  const [graphData, setGraphData] = useState({});
  const icons = {
    codeforces: 'https://codolio.com/icons/codeforces.png',
    codechef: 'https://codolio.com/icons/codechef_light.png',
    leetcode: 'https://codolio.com/icons/leetcode_light.png',
    gfg: 'https://codolio.com/icons/gfg.png'
  }

  //navigate to different pages
  const editHandler = () => {
    Navigate("/profile/edit")
  };
  const connectHandler = () => {
    Navigate("/profile/edit")
  };
  const cardHandler = () => {
    if (userdata && userdata.username) {
      Navigate(`/card/${userdata.username}`);
    } else {
      const decode = localStorage.getItem('token');
      if (decode) {
        try {
          const decodeData = jwtDecode(decode);
          Navigate(`/card/${decodeData.username}`);
        } catch {
          Navigate('/login');
        }
      }
    }
  }
  const leaderboardHandler = () => {
    Navigate('/Leaderboard')
  }

  //to share profile link

  const shareHandler = () => {
    navigator.share && navigator.share({
      title: 'My codeverse profile',
      text: 'Check out my codeverse profile!',
      url: window.location.href
    }).catch(err => console.log('error in shareing profile!', err));
  }

  function handleData(apidata) {
    setUserData(apidata)
    setProblemSolved(apidata.totalProblemsSolved);

    if (apidata.social) setSocial(apidata.social);

    if (apidata.codechefusername || apidata.codeforcesusername || apidata.gfgusername || apidata.leetcodeusername) setConnectPro(false);
    else setConnectPro(true);

    // for contest rating
    const contest = {};
    const graph = {};

    if (
      apidata.codingProfiles?.codechef?.currentRating
    ) {
      contest.codechef = {
        rating: apidata.codingProfiles.codechef.currentRating,
        rank: apidata.codingProfiles.codechef.stars,
      };
      graph.CodeChef = apidata.codingProfiles.codechef.ratingData;
    }

    if (
      apidata.codingProfiles?.codeforces?.userInfo[0]?.rating
    ) {
      contest.codeforces = {
        rating: apidata.codingProfiles.codeforces.userInfo[0].rating,
        rank: apidata.codingProfiles.codeforces.userInfo[0].rank,
      };
      graph.Codeforces = apidata.codingProfiles.codeforces.ratingData;
    }

    if (
      apidata.codingProfiles?.gfg?.userInfo?.contest_current_rating
    ) {
      contest.gfg = {
        rating: apidata.codingProfiles.gfg.userInfo.contest_current_rating,
        rank: apidata.codingProfiles.gfg.userInfo.contest_user_stars,
      };
      graph.GFG = apidata.codingProfiles.gfg.ratingData;

    }

    if (
      apidata.codingProfiles?.leetcode?.userContestRanking?.rating
    ) {
      contest.leetcode = {
        rating: apidata.codingProfiles.leetcode.userContestRanking.rating,
      };

      function getAttendedOnly(data) {
        return data.filter(item => item.attended === true);
      }

      const rtdata = apidata.codingProfiles.leetcode.userContestRankingHistory;
      graph.LeetCode = getAttendedOnly(rtdata);
    }
    setGraphData(graph);
    setContestRating(contest);

    // For heatmap
    const heatmap = {};
    if (apidata.codingProfiles && apidata.codingProfiles.leetcode && apidata.codingProfiles.leetcode.userCalendar.submissionCalendar) {
      const ltdata = JSON.parse(apidata.codingProfiles.leetcode.userCalendar.submissionCalendar);
      const converted = Object.entries(ltdata).map(([timestamp, count]) => {
        const date = new Date(parseInt(timestamp, 10) * 1000); // Convert to ms
        return {
          date: date.toISOString().split('T')[0], // YYYY-MM-DD
          value: count
        };
      });
      heatmap.leetcode = converted;
    }
    if (apidata.codingProfiles && apidata.codingProfiles.codechef && apidata.codingProfiles.codechef.heatMap) {
      heatmap.codechef = apidata.codingProfiles.codechef.heatMap;
    }
    if (apidata.codingProfiles && apidata.codingProfiles.codeforces && apidata.codingProfiles.codeforces.heatMap) {
      heatmap.codeforces = apidata.codingProfiles.codeforces.heatMap;
    }
    if (apidata.codingProfiles && apidata.codingProfiles.gfg && apidata.codingProfiles.gfg.heatMap) {
      heatmap.gfg = apidata.codingProfiles.gfg.heatMap;
    }

    function mergePlatformData(data) {
      const merged = {};
      Object.values(data).flat().forEach(({ date, value }) => {
        // Normalize date (e.g. 2025-2-3 → 2025-02-03)
        const [y, m, d] = date.split('-').map(Number);
        const normalizedDate = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

        if (!merged[normalizedDate]) {
          merged[normalizedDate] = 0;
        }
        merged[normalizedDate] += value;
      });

      return Object.entries(merged)
        .map(([date, value]) => ({ date, value }))
    }

    const merged = mergePlatformData(heatmap);
    setActiveDays(merged.length);
    heatmap.all = merged;
    setHeatmaps(heatmap);


    // for calculating codechefCount, codeforcesCount for codechef and codeforces pieChart
    setPiChartCP({
      codechefCount: apidata?.codingProfiles?.codechef?.problemSolved ? apidata.codingProfiles.codechef.problemSolved : 0,
      codeforcesCount: apidata?.codingProfiles?.codeforces?.userInfo[0]?.problemSolved ? apidata.codingProfiles.codeforces.userInfo[0].problemSolved : 0,
      gfgCount: apidata?.codingProfiles?.gfg?.userInfo?.total_problems_solved ? apidata.codingProfiles.gfg.userInfo.total_problems_solved : 0,
      leetcodeCount: apidata?.codingProfiles?.leetcode?.submitStats?.acSubmissionNum[0]?.count ? apidata.codingProfiles.leetcode.submitStats.acSubmissionNum[0].count : 0
    })

    // for calculating easy medium hard for gfg and leetcode pieChart
    const easyProblemCount = (apidata?.codingProfiles?.gfg?.userSubmissionsInfo?.Easy ? Object.keys(apidata.codingProfiles.gfg.userSubmissionsInfo.Easy).length : 0)
      + (apidata?.codingProfiles?.leetcode?.submitStats?.acSubmissionNum[1]?.count ? apidata.codingProfiles.leetcode.submitStats.acSubmissionNum[1].count : 0);
    const mediumProblemCount = (apidata?.codingProfiles?.gfg?.userSubmissionsInfo?.Medium ? Object.keys(apidata.codingProfiles.gfg.userSubmissionsInfo.Medium).length : 0)
      + (apidata?.codingProfiles?.leetcode?.submitStats?.acSubmissionNum[2]?.count ? apidata.codingProfiles.leetcode.submitStats.acSubmissionNum[2].count : 0);
    const hardProblemCount = (apidata?.codingProfiles?.gfg?.userSubmissionsInfo?.Hard ? Object.keys(apidata.codingProfiles.gfg.userSubmissionsInfo.Hard).length : 0)
      + (apidata?.codingProfiles?.leetcode?.submitStats?.acSubmissionNum[3]?.count ? apidata.codingProfiles.leetcode.submitStats.acSubmissionNum[3].count : 0);

    setPieChartGL({
      easy: easyProblemCount,
      medium: mediumProblemCount,
      hard: hardProblemCount
    })

    //for topicwise problem count for bar chart
    if (apidata.codingProfiles && apidata.codingProfiles.leetcode) {
      const tpdata = [
        ...apidata.codingProfiles.leetcode.tagProblemCounts.fundamental,
        ...apidata.codingProfiles.leetcode.tagProblemCounts.intermediate,
        ...apidata.codingProfiles.leetcode.tagProblemCounts.advanced
      ];

      setTopicWiseProbles(tpdata);
    }
  }

  async function getUserData(username) {
    const tk = localStorage.getItem('token');
    if (!tk) {
      setEditAccess(false);
      try {
        const res = await getUserProfile(username);
        const apidata = res.data[0];
        handleData(apidata);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
      return;
    }

    const decode = jwtDecode(localStorage.getItem('token'));
    const sessionid = sessionStorage.getItem('sessionid');

    if (username === decode.username) {
      setEditAccess(true);
      if (!sessionid) {
        try {
          const res = await syncUserProfile(username);
          const apidata = res.data;
          handleData(apidata);
          sessionStorage.setItem('sessionid', '1');
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      } else {
        try {
          const res = await getUserProfile(username);
          const apidata = res.data[0];
          handleData(apidata);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    } else {
      setEditAccess(false);
      try {
        const res = await getUserProfile(username);
        const apidata = res.data[0];
        handleData(apidata);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    const path = window.location.pathname;
    const segments = path.split('/');
    const username = segments[2];

    getUserData(username)

  }, [])

  const toggleState = () => {
    setshowStats(prev => !prev);
  };

  return (
    <div className='font-Inter'>
      <Navbar />
      {loading ? <ScalatonLoading /> :

        (<div className="flex flex-col md:flex-row p-4 sm:p-6 md:p-10 bg-gray-100 gap-6 justify-center pt-20 sm:pt-22 md:pt-22">

          {/* left part card*/}
          <div className='w-full md:w-80 lg:w-84 shrink-0 flex flex-col items-center rounded-xl bg-white p-6 sm:p-8 shadow-md relative'>
            {editAccess ?
              (<div className='absolute top-4 right-4' onClick={editHandler}>
                <i className="fa-solid fa-pen-to-square p-2 rounded-full text-gray-500 border-gray-200 border-1 hover:bg-gray-200 hover:cursor-pointer"></i>
              </div>) : ""
            }

            <img src={profile} alt="profile" className='rounded-full h-32' />
            {userdata.name ?
              (<h1 className='text-2xl font-bold text-center break-words max-w-full mt-5 pb-1'>{userdata.name}</h1>) : ''
            }
            {userdata.username ? (
              <div className='flex gap-2 justify-center items-center max-w-full'>
                <p className='text-blue-600 text-sm font-semibold truncate'>@{userdata.username}</p>
                <i className="fa-solid fa-circle-check text-green-600 shrink-0"></i>
              </div>) : ''
            }

            {userdata.country ?
              (<div className='flex justify-center items-center gap-2 pb-2 text-center'>
                <i className="fa-solid fa-location-dot text-gray-600"></i>
                <h1 className='text-gray-600'>{userdata.country}</h1>
              </div>) : ''
            }

            <button onClick={cardHandler} className='w-full flex gap-2 justify-center items-center bg-orange hover:bg-[#d95321] transition duration-200 hover:cursor-pointer font-semibold text-white px-5 py-2 rounded-md text-sm mb-2 shadow-xs'>
              {editAccess ? 'Get Your CodeVerse Card' : 'View CodeVerse Card'}
              <i className="fa-solid fa-id-card-clip"></i>
            </button>

            {/* Social media - only render divider and icons if at least one exists */}
            {social && (social.resume || social.linkedin || social.twitter || social.facebook || social.instagram) ? (
              <>
                <hr className='text-gray-200 w-full my-2' />
                <div className='flex justify-evenly w-full my-1'>
                  {social.resume ? (<a href={social.resume} target="_blank" rel="noreferrer" title="Resume"><RiPagesLine className='text-gray-800 hover:text-orange text-2xl transition-colors' /></a>) : ''}
                  {social.linkedin ? (<a href={`https://www.linkedin.com/in/${social.linkedin}`} target="_blank" rel="noreferrer" title="LinkedIn"><FaLinkedin className='text-gray-800 hover:text-blue-600 text-2xl transition-colors' /></a>) : ''}
                  {social.twitter ? (<a href={`https://x.com/${social.twitter}`} target="_blank" rel="noreferrer" title="Twitter / X"><FaSquareXTwitter className='text-gray-800 hover:text-black text-2xl transition-colors' /></a>) : ''}
                  {social.facebook ? (<a href={`https://www.facebook.com/${social.facebook}`} target="_blank" rel="noreferrer" title="Facebook"><FaFacebook className='text-gray-800 hover:text-blue-700 text-2xl transition-colors' /></a>) : ''}
                  {social.instagram ? (<a href={`https://www.instagram.com/${social.instagram}`} target="_blank" rel="noreferrer" title="Instagram"><FaInstagram className='text-gray-800 hover:text-pink-600 text-2xl transition-colors' /></a>) : ''}
                </div>
              </>
            ) : editAccess ? (
              <>
                <hr className='text-gray-200 w-full my-2' />
                <button
                  onClick={editHandler}
                  className='text-xs text-gray-400 hover:text-orange py-1 flex items-center justify-center gap-1.5 transition-colors cursor-pointer w-full'
                >
                  <i className="fa-solid fa-plus text-[10px]"></i> Add social profiles
                </button>
              </>
            ) : null}

            {/* Education details - only render if at least one field exists */}
            {userdata.institute || userdata.degree || userdata.branch ? (
              <>
                <hr className='text-gray-200 w-full my-2' />
                <div className='flex flex-col items-start w-full gap-2 py-1 text-sm'>
                  {userdata.institute && (
                    <div className='flex items-center gap-2 text-gray-600'>
                      <i className="fa-solid fa-building-columns text-gray-400"></i>
                      <span>{userdata.institute}</span>
                    </div>
                  )}
                  {userdata.degree && (
                    <div className='flex items-center gap-2 text-gray-600'>
                      <i className="fa-solid fa-user-graduate text-gray-400"></i>
                      <span>{userdata.degree}</span>
                    </div>
                  )}
                  {userdata.branch && (
                    <div className='flex items-center gap-2 text-gray-600'>
                      <i className="fa-solid fa-user-graduate text-gray-400"></i>
                      <span>{userdata.branch}</span>
                    </div>
                  )}
                </div>
              </>
            ) : null}

            <hr className='text-gray-200 w-full my-2' />

            {/* problem solving states */}
            <div className='w-full flex flex-col gap-1' onClick={toggleState}>
              <div className='w-full flex items-center '>
                <button className='w-full bg-gray-200 py-2 rounded-tl-xl rounded-bl-xl font-semibold pl-2 pr-7'>
                  Problem Solving Stats
                </button>
                <div className='h-full border-1 border-gray-200 p-2 rounded-tr-xl rounded-br-xl'>
                  <img src={arrow} alt="up-arrow" className={`h-5 w-5 transition-transform duration-300 ${showStats ? 'rotate-180' : ''}`} />
                </div>
              </div>

              {/* added plateforms */}
              <ul className={`overflow-hidden transition-all duration-300 ${showStats ? 'max-h-full' : 'max-h-0'}`}>
                <div className='pl-4'>
                  {userdata.leetcodeusername ?
                    (<div className='flex justify-between p-2'>
                      <div className='flex gap-2 justify-center items-center'>
                        <img src={icons.leetcode} className="w-5 h-5 object-contain" />
                        <li>LeetCode</li>
                      </div>
                      <div className='flex gap-2 justify-center items-center'>
                        <MdVerified className='text-green-600' />
                        <a href={`https://leetcode.com/u/${userdata.leetcodeusername}`}><MdLink className='text-blue-500' /></a>
                      </div>
                    </div>) : ''}

                  {userdata.gfgusername ?
                    (<div className='flex justify-between p-2'>
                      <div className='flex gap-2 justify-center items-center'>
                        <img src={icons.gfg} className="w-5 h-5 object-contain" />
                        <li>GeeksForGeeks</li>
                      </div>
                      <div className='flex gap-2 justify-center items-center'>
                        <MdVerified className='text-green-600' />
                        <a href={`https://www.geeksforgeeks.org/user/${userdata.gfgusername}`}><MdLink className='text-blue-500' /></a>
                      </div>
                    </div>) : ''}

                  {userdata.codechefusername ?
                    (<div className='flex justify-between p-2'>
                      <div className='flex gap-2 justify-center items-center'>
                        <img src={icons.codechef} className="w-5 h-5 object-contain" />
                        <li>Codechef</li>
                      </div>
                      <div className='flex gap-2 justify-center items-center'>
                        <MdVerified className='text-green-600' />
                        <a href={`https://www.codechef.com/users/${userdata.codechefusername}`}><MdLink className='text-blue-500' /></a>
                      </div>
                    </div>) : ''}

                  {userdata.codeforcesusername ?
                    (<div className='flex justify-between p-2'>
                      <div className='flex gap-2 justify-center items-center'>
                        <img src={icons.codeforces} className="w-5 h-5 object-contain" />
                        <li>Codeforces</li>
                      </div>
                      <div className='flex gap-2 justify-center items-center'>
                        <MdVerified className='text-green-600' />
                        <a href={`https://codeforces.com/profile/${userdata.codeforcesusername}`}><MdLink className='text-blue-500' /></a>
                      </div>
                    </div>) : ''}
                </div>
              </ul>

              <hr className='text-gray-300 w-full' />

              {/* Global rank and codeverse score*/}
              <div className='w-full mt-2'>
                <div className='flex flex-col gap-5 bg-orange-100 p-4 rounded-t-xl'>
                  {/* for Rank */}
                  <div>
                    <h1 className='font-bold'>Global Rank</h1>
                    <span className='text-gray-600'>Based on CodeVerse</span>
                  </div>
                  <div className='flex w-full gap-10'>
                    <FaRankingStar className='text-2xl' />
                    <span className='font-bold'>{userdata.globalRank}</span>
                  </div>

                  <hr className='text-gray-300 w-full' />

                  {/* for score */}
                  <div>
                    <h1 className='font-bold'>Your Score</h1>
                    <span className='text-gray-600'>Based on CodeVerse</span>
                  </div>
                  <div className='flex w-full gap-10'>
                    <MdScoreboard className='text-2xl' />
                    <span className='font-bold'>{userdata.score}</span>
                  </div>
                </div>
                <button onClick={leaderboardHandler} className='w-full bg-orange text-white p-2 rounded-b-xl font-semibold hover:cursor-pointer'>View Leaderboard</button>
              </div>

              <hr className='text-gray-300 w-full m-2' />

              {/* share profile */}
              <div onClick={shareHandler} className='bg-green-600 flex items-center justify-center gap-5 p-2 rounded-xl text-white font-semibold hover:cursor-pointer '>
                <span>Share Your Profile</span>
                <FaShare />
              </div>

            </div>
          </div>



          {/* right part */}
          <div className='flex flex-col gap-5 w-full lg:w-3/4'>

            {connectPro ?
              (<div className='flex flex-col md:flex-row bg-orange text-white p-5 rounded-xl gap-3 md:gap-10 justify-evenly'>
                <div className='flex flex-col gap-2'>
                  <h1 className='text-2xl font-bold'>Connect Your Profiles...</h1>
                  <p className='font-'>Connect your DSA and competitive profiles to centralize your
                    achievements and stats.</p>
                </div>

                {/* CodeVerse logo for smaller screen*/}
                <div className='self-center md:hidden'>
                  <span className='text-3xl font-semibold'>Code</span>
                  <span className=''>verse</span>
                  <span className='text-white font-extrabold'>&lt;/&gt;</span>
                </div>

                <div className='self-center'>
                  <button onClick={connectHandler} className='bg-white text-emerald-900 px-2 py-1 rounded-md font-semibold  hover:cursor-pointer hover:scale-110 transition-transform duration-300'>Connect</button>
                </div>

                {/* CodeVerse logo for large screen*/}
                <div className='self-center hidden md:block'>
                  <span className='text-3xl font-semibold'>Code</span>
                  <span className=''>verse</span>
                  <span className='text-white font-extrabold'>&lt;/&gt;</span>
                </div>
              </div>) : ''
            }

            {/* upper right part */}
            <div className='w-full flex flex-wrap gap-5 xl:justify-evenly'>
              {/* Total Questions */}
              <div className='w-full md:w-auto total_questions flex flex-col justify-center items-center bg-white rounded-xl p-10 gap-5 shadow-md'>
                <h1 className=''>Total Questions</h1>
                <span className='text-5xl font-bold'>{problemSolved}</span>
              </div>

              {/* Total Active Days */}
              <div className='w-full md:w-auto total_Active_Days flex flex-col justify-center items-center bg-white rounded-xl p-10 gap-5 shadow-md'>
                <h1>Total Active Days</h1>
                <span className=' text-5xl font-bold'>{activeDays}</span>
              </div>

              {/* heatmap */}
              <div className='w-full bg-white rounded-xl p-2 xl:flex-1 shadow-md overflow-hidden'>
                <Heatmap data={heatmaps} />
              </div>
            </div>


            {/*middle right part*/}
            <div className='flex flex-col lg:flex-row gap-5'>
              <div className='w-full shadow-md bg-white rounded-2xl'>
                <Graph data={graphData} />
              </div>

              <div className='w-full'>
                <ContestRanking data={contesRating} />
              </div>
            </div>

            {/* middle right part(piecharts) */}
            <div className='flex flex-wrap bg-white justify-evenly shadow-md rounded-2xl pb-5'>
              <div className='flex justify-center items-center p-2'>
                <PieChartCP data={piChartCP} />
              </div>
              <div className='flex justify-center items-center p-2'>
                <Piechart data={pieChartGL} />
              </div>
            </div>

            {/* topic wise problem solved (lower rignt part)*/}
            <div className='text-[13px]'>
              <TopicWiseProblem data={topicWiseProbles} />
            </div>
          </div>
        </div>)}
      <Footer />
    </div>
  )
}

export default Profile
