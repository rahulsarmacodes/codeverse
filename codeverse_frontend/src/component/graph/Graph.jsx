import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

// Month name mapping
const monthNames = {
  1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "May", 6: "Jun",
  7: "Jul", 8: "Aug", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dec",
};

const platformColors = {
  CodeChef: "#008FFB",
  Codeforces: "#FF4560",
  LeetCode: "#FEB019",
  GFG: "#00E396",
};

const PlatformGraph = ({ data }) => {
  const platformKeys = Object.keys(data || {});
  const [selectedPlatform, setSelectedPlatform] = useState("");

  useEffect(() => {
    if (platformKeys.length > 0 && !selectedPlatform) {
      setSelectedPlatform(platformKeys[0]); // Set the first platform as default
    }
  }, [data, platformKeys, selectedPlatform]);

  const rawData = data?.[selectedPlatform] || [];
  const hasData = rawData.length > 0;

  const formattedData = hasData
    ? rawData.map((d) => {
        let month = 1, day = 1, rating = 0;

        switch (selectedPlatform) {
          case "CodeChef":
            month = parseInt(d.getmonth) || 1;
            day = parseInt(d.getday) || 1;
            rating = parseInt(d.rating) || 0;
            break;

          case "Codeforces":
            if (d.ratingUpdateTimeSeconds) {
              const date = new Date(d.ratingUpdateTimeSeconds * 1000);
              month = date.getMonth() + 1;
              day = date.getDate();
            }
            rating = d.newRating || d.rating || 0;
            break;

          case "LeetCode":
            if (d.contest?.startTime) {
              const date = new Date(d.contest.startTime * 1000);
              month = date.getMonth() + 1;
              day = date.getDate();
            }
            rating = parseInt(d.rating) || 0;
            break;

          case "GFG":
            if (d.start_time) {
              const date = new Date(d.start_time);
              if (!isNaN(date)) {
                month = date.getMonth() + 1;
                day = date.getDate();
              }
            }
            rating = d.display_rating || 0;
            break;

          default:
            rating = 0;
        }

        return {
          contest: `${monthNames[month] || "?"} ${day}`,
          rating,
        };
      })
    : [];

  const categories = formattedData.map((d) => d.contest);
  const ratings = formattedData.map((d) => d.rating);
  const color = platformColors[selectedPlatform] || "#000";

  const chartOptions = {
    chart: {
      type: "area",
      background: "#ffffff",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    colors: [color],
    dataLabels: { enabled: false },
    stroke: { curve: "smooth" },
    xaxis: {
      categories,
      title: { text: "Contests" },
    },
    yaxis: {
      title: { text: "Rating" },
    },
    tooltip: { theme: "dark" },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            height: 200,
          },
        },
      },
    ],
  };

  const series = [{ name: "Rating", data: ratings }];

  return (
    <div className="w-full max-w-xl mx-auto p-4 bg-white rounded-2xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">
          {selectedPlatform} Rating Over Time
        </h2>
        <select
          value={selectedPlatform}
          onChange={(e) => setSelectedPlatform(e.target.value)}
          className="appearance-none bg-white text-sm px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-0 border-none cursor-pointer"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg fill='none' stroke='%23333' stroke-width='2' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3e%3cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'%3e%3c/path%3e%3c/svg%3e")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 0.75rem center",
            backgroundSize: "1rem",
          }}
        >
          {platformKeys.map((platform) => (
            <option key={platform} value={platform}>
              {platform}
            </option>
          ))}
        </select>
      </div>

      {hasData ? (
        <Chart
          options={chartOptions}
          series={series}
          type="area"
          height="350"
          width="100%"
        />
      ) : (
        <div className="flex items-center justify-center h-[365px] text-gray-500 text-sm">
          No data available for {selectedPlatform}.
        </div>
      )}
    </div>
  );
};

export default PlatformGraph;
