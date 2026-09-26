
import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../component/navbar/Navbar";
import "./Leaderboard.css";
import { getLeaderboard } from "../../services/api";

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedInstitute, setSelectedInstitute] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getLeaderboard();
        setLeaderboardData(res.data || []);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    };
    fetchData();
  }, []);

  const filteredData = useMemo(() => {
    const searchLower = search.toLowerCase().trim();
    return leaderboardData.filter(({ username, country, institute }) => {
      const matchSearch = (username || "").toLowerCase().includes(searchLower);
      const matchCountry = selectedCountry ? country === selectedCountry : true;
      const matchInstitute = selectedInstitute ? institute === selectedInstitute : true;
      return matchSearch && matchCountry && matchInstitute;
    });
  }, [search, selectedCountry, selectedInstitute, leaderboardData]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredData.slice(startIndex, startIndex + rowsPerPage);
  }, [currentPage, filteredData]);

  const goToPage = (page) => {
    const pageNumber = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Navbar />
      <div className="leaderboard">
        <div className="search-filters-container">
          <div className="search-filters">
            <div className="search-input-wrapper">
              <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <circle cx="10.5" cy="10.5" r="6.5" stroke="#ff5722" strokeWidth="2" fill="#fff3e0" />
                <line x1="16" y1="16" x2="21" y2="21" stroke="#ff5722" strokeWidth="3" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                placeholder="Search"
                className="search-input"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
            <select
              className="filter-dropdown"
              value={selectedCountry}
              onChange={(e) => {
                setSelectedCountry(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">Filter by Country</option>
              {Array.from(new Set(leaderboardData.map((item) => item.country).filter((c) => c && c !== "N/A")))
                .sort()
                .map((country) => (
                  <option key={country} value={country}>{country}</option>
                ))}
            </select>
            <select
              className="filter-dropdown"
              value={selectedInstitute}
              onChange={(e) => {
                setSelectedInstitute(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">Filter by Institute</option>
              {Array.from(new Set(leaderboardData.map((item) => item.institute).filter((i) => i && i !== "N/A")))
                .sort()
                .map((institute) => (
                  <option key={institute} value={institute}>{institute}</option>
                ))}
            </select>
            <button
              className="reset-btn"
              onClick={() => {
                setSearch("");
                setSelectedCountry("");
                setSelectedInstitute("");
                setCurrentPage(1);
              }}
            >
              <i className="fa-solid fa-rotate-right"></i>
            </button>
          </div>
        </div>

        <div className="table-responsive-container">
          <table>
            <thead>
              <tr>
                <th>Global Rank</th>
                <th>Username</th>
                <th>Institute</th>
                <th>Country</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((coder) => (
                <tr key={coder.username || coder._id || coder.globalRank}>
                  <td className="font-semibold">
                    {coder.globalRank === 1 ? "🥇 1" : coder.globalRank === 2 ? "🥈 2" : coder.globalRank === 3 ? "🥉 3" : coder.globalRank}
                  </td>
                  <td>
                    <Link to={`/profile/${coder.username}`} className="text-blue-600 hover:underline font-medium">
                      {coder.username}
                    </Link>
                  </td>
                  <td>{coder.institute || "N/A"}</td>
                  <td>{coder.country || "N/A"}</td>
                  <td className="font-bold text-orange-600">{coder.score ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination">
          {totalPages > 1 ? (
            <>
              <button className="PNpage" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
                <i className="fa-solid fa-caret-left"></i> PREV
              </button>
              <button className={currentPage === 1 ? "active-page" : "PButtons"} onClick={() => goToPage(1)}>
                1
              </button>
              {totalPages > 5 ? (
                <>
                  {currentPage > 3 && <span>...</span>}
                  {Array.from({ length: totalPages }, (_, index) => index + 1)
                    .filter(page => {
                      if (currentPage <= 3) return page >= 2 && page <= 4;
                      if (currentPage >= totalPages - 2) return page >= totalPages - 3 && page < totalPages;
                      return Math.abs(page - currentPage) <= 1;
                    })
                    .map(page => (
                      page !== totalPages && (
                        <button
                          key={page}
                          onClick={() => goToPage(page)}
                          className={currentPage === page ? "active-page" : "PButtons"}
                        >
                          {page}
                        </button>
                      )
                    ))}
                  {currentPage < totalPages - 2 && <span>...</span>}
                  <button className={currentPage === totalPages ? "active-page" : "PButtons"} onClick={() => goToPage(totalPages)}>
                    {totalPages}
                  </button>
                </>
              ) : (
                Array.from({ length: totalPages - 1 }, (_, index) => index + 2).map(page => (
                  <button key={page} onClick={() => goToPage(page)} className={currentPage === page ? "active-page" : "PButtons"}>
                    {page}
                  </button>
                ))
              )}
              <button className="PNpage" onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
                NEXT <i className="fa-solid fa-caret-right"></i>
              </button>
            </>
          ) : totalPages === 1 ? (
            <button className="active-page">1</button>
          ) : (
            <p className="no-data">Sorry, No data Available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
