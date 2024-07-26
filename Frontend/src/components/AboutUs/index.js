import React from 'react';

import './style.css';
import Navbar from '../navbar';
import Footer from '../footer';

const AboutUsPage = () => {
    return (
        <div>
            <Navbar />
            <div className="about-us-container">
                <div className="about-us-content">
                    <h1>About Storify</h1>
                    <p>
                        Welcome to Storify! Our mission is to provide seamless and secure file storage solutions for everyone.
                        We aim to make digital storage easy and accessible, ensuring your files are always safe and within reach.
                    </p>
                    <h2>Our Values</h2>
                    <ul>
                        <li><strong>Security:</strong> Keeping your data safe is our top priority.</li>
                        <li><strong>Accessibility:</strong> Access your files from anywhere, at any time.</li>
                        <li><strong>Innovation:</strong> Constantly improving to meet your needs.</li>
                    </ul>
                    <h2>Meet the Team</h2>
                    <p>
                        Our team is composed of dedicated professionals committed to delivering the best storage solutions.
                        We are passionate about technology and strive to innovate continuously.
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AboutUsPage;
