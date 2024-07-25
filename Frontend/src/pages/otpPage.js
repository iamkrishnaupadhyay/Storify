import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { useSelector } from "react-redux";
import useGenerateNewOtp from "../hooks/useGenerateNewOtp";
import Footer from "../components/footer";
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useVerifyOtp from "../hooks/useVerifyOtp";



const OtpPage = () => {
    const { email } = useSelector((e) => e.auth);
    const [otp, setOtp] = useState("");
    const { verifyOtp } = useVerifyOtp();
    useGenerateNewOtp();

    const handleSubmit = () => {
        if (otp.length < 4) {
            toast.error("Invalid OTP");
        } else {
            const num = parseInt(otp);
            if (num >= 1000 && num <= 9999) {
                toast.info("You have Entered: " + num);
                verifyOtp(num);
            } else {
                toast.error("Invalid OTP. OTP must be Number");
            }
        }
    };
    
    return (
        <>
            <Navbar />
            <div className="otp-page-container">
                <h2 className="otp-heading">Verify Your OTP</h2>
                <p className="otp-info">We’ve sent a One-Time Password (OTP) to your email address: <strong>{email}</strong></p>
                <p className="otp-subtext">Enter the OTP below to proceed:</p>
                <div className="otp-input-container">
                    <input
                        maxLength={4}
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <div className="otp-column c1" />
                    <div className="otp-column c2" />
                    <div className="otp-column c3" />
                    <div className="otp-column c4" />
                </div>
                <button className="otp-submit-button" onClick={handleSubmit}>Verify OTP</button>
            </div>
            <Footer />
            <ToastContainer />
        </>
    );
};

export default OtpPage; 