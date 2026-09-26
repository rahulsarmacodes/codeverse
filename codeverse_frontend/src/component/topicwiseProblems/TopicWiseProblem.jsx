import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const intermediateData = [
  { tagName: 'Tree', problemsSolved: 8 },
  { tagName: 'Binary Tree', problemsSolved: 7 },
  { tagName: 'Hash Table', problemsSolved: 21 },
  { tagName: 'Ordered Set', problemsSolved: 1 },
  { tagName: 'Graph', problemsSolved: 14 },
  { tagName: 'Greedy', problemsSolved: 1 },
  { tagName: 'Binary Search', problemsSolved: 14 },
  { tagName: 'Depth-First Search', problemsSolved: 27 },
  { tagName: 'Breadth-First Search', problemsSolved: 29 },
  { tagName: 'Recursion', problemsSolved: 4 },
  { tagName: 'Sliding Window', problemsSolved: 8 },
  { tagName: 'Math', problemsSolved: 11 },
  { tagName: 'Design', problemsSolved: 2 },
];

const TopicWiseProblem = (data) => {
  return (
    <div className="w-full h-[500px] p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Problems Solved by Topic</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data.data} margin={{ top: 30, right: 30, left: 20, bottom: 90 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="tagName" angle={-90} textAnchor="end" interval={0} height={120} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="problemsSolved" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopicWiseProblem;
