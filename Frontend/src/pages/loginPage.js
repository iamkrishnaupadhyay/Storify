import { useState } from "react";
import useLogin from "../hooks/useLogin";
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const LoginPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useLogin();

    const handleSubmit = () => {
        const validation = true;
        if (validation) {
            login({ email, password });
        } else {
            toast.error("Validation failed");
        }
    }
    return (
        <div className="login-page-container">
            <div className="background-image"></div>
            <div className="form-container">
                <div className="form-container-content">
                    <h1>Login to your account</h1>
                    <p>Don't have an account yet? <Link to="/signup">Signup</Link></p>
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
                    <button onClick={handleSubmit}>Login</button>
                </div>
            </div>
            <ToastContainer />
        </div>

    )
};

export default LoginPage;