import React, { useEffect, useState } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

const Heatmap = ({ data }) => {
  const platforms = Object.keys(data || {});
  const [selectedPlatform, setSelectedPlatform] = useState('');

  // Update selectedPlatform when platforms change
  useEffect(() => {
    if (platforms.length > 0 && !selectedPlatform) {
      setSelectedPlatform(platforms[platforms.length-1]);
    }
  }, [platforms]);

  const today = new Date();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(today.getMonth() - 6);
  const startDate = sixMonthsAgo.toISOString().split('T')[0];

  const getColorClass = (count) => {
    if (count >= 40) return 'color-scale-5';
    if (count >= 20) return 'color-scale-4';
    if (count >= 10) return 'color-scale-3';
    if (count >= 5) return 'color-scale-2';
    if (count >= 1) return 'color-scale-1';
    return 'color-empty';
  };

  const handlePlatformChange = (e) => {
    setSelectedPlatform(e.target.value);
  };

  const heatmap = data?.[selectedPlatform] || [];

  return (
    <div className="relative w-full p-4 rounded-md bg-white">
      <div className="overflow-x-auto w-full pb-2">
        <div className="min-w-[500px]">
          <CalendarHeatmap
            startDate={startDate}
            endDate={today}
            values={heatmap}
            showMonthLabels={true}
            classForValue={(value) => {
              if (!value) return 'color-empty';
              return getColorClass(value.value);
            }}
            showWeekdayLabels={false}
            gutterSize={2}
            onClick={(value) => value?.value && alert(`Count: ${value.value}`)}
          />
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end gap-1 text-xs mt-2">
        <span className="text-gray-600">Less</span>
        <span className="w-[10px] h-[10px] inline-block rounded-sm bg-[#c6e48b]"></span>
        <span className="w-[10px] h-[10px] inline-block rounded-sm bg-[#7bc96f]"></span>
        <span className="w-[10px] h-[10px] inline-block rounded-sm bg-[#239a3b]"></span>
        <span className="w-[10px] h-[10px] inline-block rounded-sm bg-[#196127]"></span>
        <span className="w-[10px] h-[10px] inline-block rounded-sm bg-[#00441b]"></span>
        <span className="text-gray-600">More</span>
      </div>

      {/* Platform Selector */}
      <div className="absolute bottom-2 left-4 flex items-center gap-1 text-xs">
        <label className="text-gray-600">Platform:</label>
        <select
          className="bg-white text-gray-800 text-xs px-2 py-[2px] rounded-md focus:outline-none transition shadow-none border border-gray-300"
          value={selectedPlatform}
          onChange={handlePlatformChange}
        >
          {platforms.map((platform) => (
            <option key={platform} value={platform}>
              {platform.charAt(0).toUpperCase() + platform.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Custom styles */}
      <style>{`
        .react-calendar-heatmap text {
          font-size: 7px;
        }
        .react-calendar-heatmap rect {
          rx: 2;
          ry: 2;
        }
        .color-empty { fill: #eee; }
        .color-scale-1 { fill: #c6e48b; }
        .color-scale-2 { fill: #7bc96f; }
        .color-scale-3 { fill: #239a3b; }
        .color-scale-4 { fill: #196127; }
        .color-scale-5 { fill: #00441b; }
      `}</style>
    </div>
  );
};

export default Heatmap;
