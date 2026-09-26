import React from "react";
import Chart from "react-apexcharts";

const Piechart = ({ data }) => {
  const icons = {
    codeforces: 'https://codolio.com/icons/codeforces.png',
    codechef: 'https://codolio.com/icons/codechef_light.png',
    leetcode: 'https://codolio.com/icons/leetcode_light.png',
    gfg: 'https://codolio.com/icons/gfg.png'
  }
  const options = {
  labels: ["Easy", "Medium", "Hard"],
  colors: ["#00E398", "#FEB010", "#F43747"],
  dataLabels: {
    enabled: false
  },
  legend: {
    position: "bottom"
  },
  plotOptions: {
    pie: {
      donut: {
        labels: {
          show: true,
          name: {
            show: true,
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#495057',
            offsetY: -10
          },
          value: {
            show: true,
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#212529',
            offsetY: 10,
            formatter: function (val) {
              return val;
            }
          },
          total: {
            show: true,
            label: 'Total',
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#000',
            formatter: function (w) {
              return w.globals.seriesTotals.reduce((a, b) => a + b, 0);
            }
          }
        }
      }
    }
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
        legend: {
          position: "bottom"
        }
      }
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          height: 250,
        },
        legend: {
          position: "bottom"
        }
      }
    }
  ]
};

  const series = [data.easy, data.medium, data.hard];

  return (
    <div className="w-full flex flex-col items-center gap-5 max-w-md px-4 py-2 mx-auto">
      <span className="text-slate-700 font-bold">DSA</span>
      <Chart
        options={options}
        series={series}
        type="donut"
        width="100%"
        height={300}
      />
      <div className='flex gap-2 '>
        <img src={icons.gfg} alt="" className="w-7 h-7 object-contain" />
        <img src={icons.leetcode} alt="" className="w-7 h-7 object-contain" />
      </div>
    </div>
  );
};

export default Piechart;
