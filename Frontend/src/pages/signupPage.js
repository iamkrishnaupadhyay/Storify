import { useState } from "react";
import useSignup from "../hooks/useSignup";
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignupPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signup } = useSignup();

    const handleSubmit = () => {
        const validation = true;
        if (validation) {
            signup({ email, password });
        } else {
            toast.error("validation failed");
        }
    }
    return (
        <div className="signup-page">
            <div className="signup-page-container">
                <h1>Sign Up</h1>
                <p>Already have an account? <Link to="/login">Login</Link></p>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email..."
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password..."
                />
                <button onClick={handleSubmit}>Signup</button>
            </div>
            <ToastContainer />
        </div>

    )
};

export default SignupPage;