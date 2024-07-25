import React from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import "./websitePage.css";

const WebsitePage = () => {
    return (
        <div className="website-page">
            <Navbar />
            <div className="main-content-website">
                <div className="content-section-website">
                    <div className="dynamic-text">Storify</div>
                    <div className="content">
                        <div className="paragraph">
                            <p>
                                <span className="highlighted">Welcome</span> to Storify, your ultimate cloud storage solution designed for modern needs. Our platform offers seamless storage capabilities, providing a secure and accessible space for all your files. Whether you're managing personal documents, collaborating on team projects, or sharing large media files, Storify ensures efficient performance with top-notch security. Our user-friendly interface is designed for simplicity and ease of use, making file management effortless.
                            </p>
                        </div>
                        <div className="highlights">
                            <h2>Key features include:</h2><br></br>
                            <div className="highlight-item">Real-time synchronization across devices</div>
                            <div className="highlight-item">Advanced search functionalities</div>
                            <div className="highlight-item">Customizable access controls</div>
                            <div className="highlight-item">Robust encryption for data protection</div>
                            <div className="highlight-item">Efficient file sharing and collaboration tools</div>
                            <div className="highlight-item">Seamless integration with other platforms</div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default WebsitePage;
