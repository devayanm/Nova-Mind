import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHome,
    faBook,
    faTachometerAlt,
    faUserMd,
    faUserPlus,
    faSignInAlt,
    faUser,
    faSignOutAlt,
    faTimes
} from '@fortawesome/free-solid-svg-icons';
import { useUserAuth } from '../context/UserAuthContext';

const Navbar = () => {
    const { user, logOut } = useUserAuth();
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    const handleToggleNav = () => {
        setIsNavCollapsed(!isNavCollapsed);
    };

    const handleLogout = () => {
        logOut();
        setIsNavCollapsed(true);
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary d-lg-none">
                <div className="container" style={{ display: 'flex', alignItems: 'center' }}>
                    <Link to="/" className="navbar-brand">
                        <img
                            src="./img/logo.png"
                            alt="Nova Mind"
                            height="100"
                            className="d-inline-block align-top m-1"
                        />
                    </Link>
                    <button
                        style={{ marginLeft: 'auto', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
                        type="button"
                        onClick={handleToggleNav}
                    >
                        <span style={{ color: 'white', fontSize: '1.5rem' }}>&#9776;</span>
                    </button>
                </div>

                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: isNavCollapsed ? '-300px' : '0',
                        width: '300px',
                        height: '100%',
                        backgroundColor: '#333',
                        zIndex: '1000',
                        transition: 'left 0.3s ease-in-out',
                        overflowY: 'auto',
                    }}
                >
                    <button
                        style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'transparent', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer' }}
                        onClick={handleToggleNav}
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                    <ul style={{ listStyle: 'none', padding: '20px' }}>
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
                <div
                    style={{
                        display: isNavCollapsed ? 'none' : 'block',
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'rgba(0, 0, 0, 0.5)',
                        zIndex: '999',
                    }}
                    onClick={handleToggleNav}
                ></div>
            </nav>

            <nav className="navbar navbar-expand-lg navbar-dark bg-primary d-none d-lg-block">
                <div className="container">
                    <Link to="/" className="navbar-brand">
                        <img
                            src="./img/logo.png"
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
                            {user ? (
                                <>
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
        </>
    );
};

export default Navbar;
