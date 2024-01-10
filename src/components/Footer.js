import React from 'react';

const Footer = () => {
    return (
        <footer className="footer mt-auto py-3 bg-dark text-light">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h5>Contact Us</h5>
                        <p>
                            Email: contact@example.com <br />
                            Phone: (123) 456-7890
                        </p>
                    </div>
                    <div className="col-md-6">
                        <h5>Follow Us</h5>
                        <p>
                            <a href="#!" className="text-light">
                                Facebook
                            </a>{' '}
                            |{' '}
                            <a href="#!" className="text-light">
                                Twitter
                            </a>{' '}
                            |{' '}
                            <a href="#!" className="text-light">
                                Instagram
                            </a>
                        </p>
                    </div>
                </div>
            </div>
            <div className="text-center">
                <span className="text-muted">© 2024 Nova Mind. All rights reserved.</span>
            </div>
        </footer>
    );
};

export default Footer;
