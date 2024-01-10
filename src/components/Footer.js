import React from 'react';
import { FaEnvelope, FaPhone, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer mt-auto py-5 bg-dark text-light">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h5>Contact Us</h5>
                        <p className="mb-4">
                            For any inquiries or support, feel free to reach out to us:
                        </p>
                        <p className="mb-2">
                            <FaEnvelope className="footer-icon" />{' '}
                            <a href="mailto:info@novamind.com" className="text-light">info@novamind.com</a>
                        </p>
                        <p>
                            <FaPhone className="footer-icon" /> +1 (123) 456-7890
                        </p>
                    </div>
                    <div className="col-md-6">
                        <h5>Follow Us</h5>
                        <p className="mb-4">
                            Stay connected with us on social media for updates and more:
                        </p>
                        <p className="mb-2">
                            <a href="#!" className="text-light"><FaFacebook className="footer-icon" /> Facebook</a>{' '}
                        </p>
                        <p className="mb-2">
                            <a href="#!" className="text-light"><FaTwitter className="footer-icon" /> Twitter</a>{' '}
                        </p>
                        <p>
                            <a href="#!" className="text-light"><FaInstagram className="footer-icon" /> Instagram</a>
                        </p>
                    </div>
                </div>
            </div>
            <div className="text-center mt-4">
                <span className="text-muted">© 2024 Nova Mind. All rights reserved.</span>
            </div>
        </footer>
    );
};

export default Footer;
