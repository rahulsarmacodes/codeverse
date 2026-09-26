import React from 'react';
import "./Features.css"

const Features = () => {
  return (
    <div className='feature-container'>
      <div className="f-header">
        <h2>Everything You Need to <span style={{color:"#F26430"}}>Grow</span></h2>
        <p>Track your progress, analyze your performance, and improve your coding skills.</p>
      </div>
      <div className="f-section">
        <div className="f-section-child">
            <div className="fs-icon">
                <div className="fs-svg-icon-1" ></div>
            </div>
            <h3>Unified Dashboard</h3>
            <p>View all your coding profiles in one elegant dashboard with real-time updates across platforms.</p>
        </div>
        <div className="f-section-child">
            <div className="fs-icon"><i className="fa-solid fa-chart-line"></i></div>
            <h3>Progress Tracking</h3>
            <p>Monitor your growth over time with beautiful visualizations and insightful analytics.</p>
        </div>
        <div className="f-section-child">
            <div className="fs-icon"><i className="fa-solid fa-award"></i></div>
            <h3>Contest Performance</h3>
            <p>Track your performance in contests across all platforms and identify areas for improvement.</p>
        </div>
        <div className="f-section-child">
            <div className="fs-icon"><i className="fa-solid fa-chart-simple"></i></div>
            <h3>Problem Solving Stats</h3>
            <p>Get detailed statistics about your problem-solving patterns and efficiency.</p>
        </div>
        <div className="f-section-child">
            <div className="fs-icon">
                <div className="fs-svg-icon"></div>
            </div>
            <h3>Activity Monitoring</h3>
            <p>Stay consistent with activity tracking and personalized coding streaks.</p>
        </div>
        <div className="f-section-child">
            <div className="fs-icon"><i class="fa-solid fa-layer-group"></i></div>
            <h3>Multi-Platform Support</h3>
            <p>Support for Codeforces, CodeChef, LeetCode, and GeeksforGeeks with more coming soon.</p>
        </div>
      </div>
    </div>
  )
}

export default Features
