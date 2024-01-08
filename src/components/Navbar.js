import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBook, faTachometerAlt, faUserMd, faUserPlus, faSignInAlt, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useUserAuth } from '../context/UserAuthContext';

const Navbar = () => {
    const { user, logOut } = useUserAuth();

    const handleLogout = () => {
        logOut();
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
                <Link to="/" className="navbar-brand">
                    <img
                        src="./img/logo.png" // Replace with the actual path to your logo image
                        alt="Nova Mind"
                        height="100"
                        className="d-inline-block align-top m-1"
                    />
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link" style={{ fontSize: '1.2rem', marginRight: '15px' }}>
                                <FontAwesomeIcon icon={faHome} className="mr-1" />
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/resources" className="nav-link" style={{ fontSize: '1.2rem', marginRight: '15px' }}>
                                <FontAwesomeIcon icon={faBook} className="mr-1" />
                                Resources
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/dashboard" className="nav-link" style={{ fontSize: '1.2rem', marginRight: '15px' }}>
                                <FontAwesomeIcon icon={faTachometerAlt} className="mr-1" />
                                Dashboard
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/therapists" className="nav-link" style={{ fontSize: '1.2rem', marginRight: '15px' }}>
                                <FontAwesomeIcon icon={faUserMd} className="mr-1" />
                                Therapists
                            </Link>
                        </li>
                        {user ? (
                            <>
                                <li className="nav-item">
                                    <Link to="/profile" className="nav-link" style={{ fontSize: '1.2rem', marginRight: '15px' }}>
                                        <FontAwesomeIcon icon={faUser} className="mr-1" />
                                        Profile
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link btn btn-link" onClick={handleLogout} style={{ fontSize: '1.2rem', marginRight: '15px' }}>
                                        <FontAwesomeIcon icon={faSignOutAlt} className="mr-1" />
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link" style={{ fontSize: '1.2rem', marginRight: '15px' }}>
                                        <FontAwesomeIcon icon={faSignInAlt} className="mr-1" />
                                        Login
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/register" className="nav-link" style={{ fontSize: '1.2rem', marginRight: '15px' }}>
                                        <FontAwesomeIcon icon={faUserPlus} className="mr-1" />
                                        Register
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
