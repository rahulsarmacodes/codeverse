import React from 'react'
import "./HomeFooter.css"

const HomeFooter = () => {
    return (
        <>
            <div className='footer-container'>
                <div className="ft-left">
                    <div className="ft-main-text">
                        <div className="logo">CodeVerse</div>
                    </div>
                    <div className="ft-small-text">Join Our Community: Connect with like-minded <br />individuals and grow your network.</div>
                </div>
                <div className="ft-right">
                    <div className="ft-right-left">
                        <div className="ft-title">CodeVerse's</div>
                        <ul>
                            <li>Privacy Policy</li>
                            <li>Term of Service</li>
                            <li>About Us</li>
                            <li>Disclaimer</li>
                            <li>Contact Us</li>
                        </ul>
                    </div>
                    <div className="ft-right-right">
                        <div className="ft-right-top">
                            <div className="ft-title">Follow us on</div>
                            <div className="ft-social-icons">
                                <a href="https://www.linkedin.com/in/codeverse-webspace"><i className="fa-brands fa-linkedin"></i></a>
                                <a href="https://www.facebook.com/share/1DvVrAKsM5"><i className="fa-brands fa-facebook"></i></a>
                                <a href="https://www.instagram.com/codeverse.webspace"><i className="fa-brands fa-instagram"></i></a>
                                <a href="https://x.com/CodeVerseWS"><i className="fa-brands fa-x-twitter"></i></a>
                            </div>
                        </div>
                        <div className="ft-right-bottom">
                            <div className="ft-title">Contact us</div>
                            <div className='cn-email'>
                                <i className="fa-solid fa-envelope" />codeverse.webspace@gmail.com
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="footer-container-bottom">
                <div className="ft-container-b-text-box">
                    <p>Copyright © 2025 CodeVerse - All rights reserved.</p>
                </div>

            </div>
        </>
    )
}

export default HomeFooter
