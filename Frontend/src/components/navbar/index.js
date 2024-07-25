import "./style.css"
import { useDispatch, useSelector } from "react-redux"
import { appLogout } from "../../store/slices/authSlice";
import cloudimg from "./cloud-data.png";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthorized = useSelector((state) => state.auth.isAuthorized);

    const handleLogin = () => {
        navigate("/login");
    };

    const handleSignup = () => {
        navigate("/signup");
    };

    const handleLogout = () => {
        dispatch(appLogout());
    }
    return (
        <nav className="navbar-container">
            <div className="navbar-left-item">
                <a href="/" className="navbar-logo">
                    <img src={cloudimg} alt="Logo" className="logo" />
                    Storify
                </a>
            </div>
            <div>
                {!isAuthorized ? (
                    <>
                        <ul className="navbar-menu">
                            <li><a className="active" href="#"> Security</a></li>
                            <li><a href="#features">Features</a></li>
                            <li><a href="#pricing">Blogs</a></li>
                            <li><a href="#about">About Us</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                    </>
                ) : (
                    <ul className="navbar-menu">
                        <li><a className="active" href="#"><i className="fa fa-fw fa-home"></i> Home</a></li>
                        <li><a href="#features">Features</a></li>
                        <li><a href="#pricing">Pricing</a></li>
                        <li><a href="#about">About Us</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                )}
            </div>

            <div className="navbar-right-item">
                {!isAuthorized ? (
                    <>
                        <button onClick={handleLogin}>Login</button>
                        <button onClick={handleSignup}>Sign Up</button>
                    </>
                ) : (
                    <button onClick={handleLogout}>Logout</button>
                )}
            </div>
        </nav>
    )
}
export default Navbar;