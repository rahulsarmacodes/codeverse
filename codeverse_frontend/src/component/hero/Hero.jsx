import React from 'react'
import "./Hero.css";
import mousePointer1 from '../../assets/mouse-pointer-svgrepo-1.svg';
import mousePointer2 from '../../assets/mouse-pointer-svgrepo-2.svg';
import mousePointer3 from '../../assets/mouse-pointer-svgrepo-3.svg';
import mousePointer4 from '../../assets/mouse-pointer-svgrepo-4.svg';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="hero-container">
      <div className='hr-container'>
        <div className="top-hero">
          <div className="main-text">
            <p>Track Your <span style={{ color: "#F26430" }}>Coding Journey </span></p>
            <p>Across All Platforms in One Place</p>
          </div>
          <div className="small-text">Track, analyze, and showcase your coding profile like never before.</div>
        </div>
        <div className="bottom-hero">
          <Link to='/signup' ><div className="hero-g-button">Get Started</div></Link>
          <Link to='/leaderboard' ><div className="hero-j-button">Leaderboard</div></Link>
        </div>
        <div className="left-abs-element">
          <div className="codeprofile-cursor-right">
            <img src={mousePointer1} alt="" />
          </div>
          <div className="codeprofile">CodeForces</div>
        </div>
        <div className="left-abs-element-1">
          <div className="codeprofile-cursor-right">
            <img src={mousePointer4} alt="" />
          </div>
          <div className="codeprofile" style={{ backgroundColor: "#22A774" }}>Leetcode</div>
        </div>
        <div className="right-abs-element">
          <div className="codeprofile-cursor-left"><img src={mousePointer2} alt="" /></div>
          <div className="codeprofile" style={{ backgroundColor: "#F97C07" }}>GeeksforGeeks</div>
        </div>
        <div className="right-abs-element-1">
          <div className="codeprofile-cursor-left"><img src={mousePointer3} alt="" /></div>
          <div className="codeprofile" style={{ backgroundColor: "#28D4DC" }}>CodeChef</div>
        </div>
      </div>
    </div>
  )
}

export default Hero
