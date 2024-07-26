import "./style.css"
import { useDispatch, useSelector } from "react-redux"
import { appLogout } from "../../store/slices/authSlice";
import cloudimg from "./cloud-data.png";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { name } = useSelector((e) => e.auth);
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

    const handleNavigation = (path) => {
        navigate(path);
    };


    return (
        <nav className="navbar-container">
            <div className="navbar-left-item">
                <a href="/" className="navbar-logo">
                    <img src={cloudimg} alt="Logo" className="logo" />
                    Storifyyy
                </a>
            </div>
            <div>
                {!isAuthorized ? (
                    <>
                        <ul className="navbar-menu">
                            <li><a className="active" href="#" ><i class="fa-solid fa-lock"></i>&nbsp; Security</a></li>
                            <li><a href="#features" ><i class="fa-solid fa-hashtag" ></i>&nbsp;Features</a></li>
                            <li><a href="#pricing"><i class="fa-solid fa-square-rss"></i>&nbsp;Blogs</a></li>
                            <li><a href="#about" onClick={() => handleNavigation('/aboutus')}><i class="fa-solid fa-address-card"></i>&nbsp;About Us</a></li>
                            <li><a href="#contact" onClick={() => handleNavigation('/contactus')}><i class="fa-solid fa-address-book"></i>&nbsp;Contact</a></li>
                        </ul>
                    </>
                ) : (
                    <ul className="navbar-menu">
                        <li><a className="active" href="#" onClick={() => handleNavigation('/')}><i className="fa fa-fw fa-home"></i> Home</a></li>
                        <li><a href="#features"><i class="fa-solid fa-hashtag"></i>&nbsp;Features</a></li>
                        <li><a href="#pricing"><i class="fa-solid fa-hand-holding-dollar"></i>&nbsp;Pricing</a></li>
                        <li><a href="#about" onClick={() => handleNavigation('/aboutus')}><i class="fa-solid fa-address-card"></i>&nbsp;About Us</a></li>
                        <li><a href="#contact" onClick={() => handleNavigation('/contactus')}><i class="fa-solid fa-address-book"></i>&nbsp;Contact</a></li>
                    </ul>
                )}
            </div>

            <div className="navbar-right-item">
                {!isAuthorized ? (
                    <>
                        <button onClick={handleLogin}><i class="fa-solid fa-arrow-right-to-bracket"></i>&nbsp;Login</button>
                        <button onClick={handleSignup}><i class="fa-solid fa-user-plus"></i>&nbsp;Sign Up</button>
                    </>
                ) : (
                    <>
                        <h3 className="user-name"><i class="fa-solid fa-user"></i>&nbsp;{name}</h3>
                        <button onClick={handleLogout}><i class="fa-solid fa-right-from-bracket"></i>&nbsp;Logout</button>
                    </>

                )}
            </div>
        </nav>
    )
}
export default Navbar;