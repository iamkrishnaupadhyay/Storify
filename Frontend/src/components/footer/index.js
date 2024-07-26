import "./style.css";
const Footer = () => {
    return (
        <footer>
            <div className="footer-container">
                <div className="footer-section about">
                    <h2>About Us</h2>
                    <p>
                        Storify is a leading cloud service provider offering reliable and scalable solutions for your business needs.
                    </p>
                    <div className="social-icons">
                        <a href="#"><i className="fab fa-facebook-f"></i></a>
                        <a href="#"><i className="fab fa-twitter"></i></a>
                        <a href="#"><i className="fab fa-instagram"></i></a>
                        <a href="#"><i className="fab fa-linkedin-in"></i></a>
                        <a href="#"><i class="fa-solid fa-envelope"></i></a>
                        <a href="#"><i class="fa-brands fa-github"></i></a>
                        <a href="#"><i class="fa-brands fa-discord"></i></a>
                        <a href="#"><i class="fa-brands fa-youtube"></i></a>
                        <a href="#"><i class="fa-brands fa-paypal"></i></a>
                        <a href="#"><i class="fa-brands fa-telegram"></i></a>
                        <a href="#"><i class="fa-brands fa-whatsapp"></i></a>
                    </div>
                </div>
                <div className="footer-section links">
                    <h2>Quick Links</h2>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Services</a></li>
                        <li><a href="#">Contact</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                    </ul>
                </div>
                <div className="footer-section contact">
                    <h2>Contact Us</h2>
                    <ul>
                        <li>Email: support@storify.com</li>
                        <li>Phone: +91 234 567 890</li>
                        <li>Address: 24 Storify Building, New Delhi, India</li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                &copy; 2024 Storify | All Rights Reserved
            </div>
        </footer>

    )
};

export default Footer;