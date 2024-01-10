import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';
import {
    FaUser,
    FaSignOutAlt,
    FaSmile,
    FaFrown,
    FaMeh,
    FaEdit,
    FaBirthdayCake,
    FaPhoneAlt,
    FaIdBadge,
    FaTint,
} from 'react-icons/fa';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import axios from 'axios';
import { motion } from 'framer-motion';

const Profile = () => {
    const { user, logOut } = useUserAuth();
    const navigate = useNavigate();
    const [showEditModal, setShowEditModal] = useState(false);
    const [editedDetails, setEditedDetails] = useState({
        name: '',
        phoneNumber: '',
        dateOfBirth: '',
        bloodGroup: '',
    });

    const [mentalHealthData, setMentalHealthData] = useState({
        labels: ['Well', 'Neutral', 'Struggling'],
        datasets: [
            {
                data: [70, 20, 10],
                backgroundColor: ['#28a745', '#ffc107', '#dc3545'],
            },
        ],
    });

    const fetchUserDetails = async () => {
        try {
            if (!user || typeof user.getIdToken !== 'function') {
                return;
            }

            const firebaseToken = await user.getIdToken();
            const response = await axios.get('http://localhost:3001/profile', {
                headers: {
                    Authorization: `Bearer ${firebaseToken}`,
                },
            });

            setEditedDetails({
                name: response.data.name || '',
                phoneNumber: response.data.phoneNumber || '',
                dateOfBirth: response.data.dateOfBirth || '',
                bloodGroup: response.data.bloodGroup || '',
            });
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    useEffect(() => {
        fetchUserDetails();
    }, [user]);

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleLogout = async () => {
        try {
            await logOut();
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const handleShowEditModal = () => {
        setShowEditModal(true);
        setEditedDetails({
            name: user.name || '',
            phoneNumber: user.phoneNumber || '',
            dateOfBirth: user.dateOfBirth || '',
            bloodGroup: user.bloodGroup || '',
        });
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
    };

    const handleSaveChanges = async () => {
        try {
            if (!user || typeof user.getIdToken !== 'function') {
                return;
            }

            const firebaseToken = await user.getIdToken();
            const response = await axios.post(
                'http://localhost:3001/profile/update',
                {
                    name: editedDetails.name,
                    phoneNumber: editedDetails.phoneNumber,
                    dateOfBirth: editedDetails.dateOfBirth,
                    bloodGroup: editedDetails.bloodGroup,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${firebaseToken}`,
                    },
                }
            );

            setEditedDetails({
                name: response.data.user.name,
                phoneNumber: response.data.user.phoneNumber,
                dateOfBirth: response.data.user.dateOfBirth,
                bloodGroup: response.data.user.bloodGroup,
            });

            setShowEditModal(false);
        } catch (error) {
            console.error('Error updating user details:', error);
            console.log('Axios Error Details:', error.toJSON());
        }
    };

    const pieChartOptions = {
        maintainAspectRatio: false,
        height: 400,
        width: 400,
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    const mood = 'Well';

    const moodVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Your Profile</h2>
            {user && (
                <div>
                    <div className="card mb-4">
                        <div className="card-body">
                            <div className="d-flex align-items-center justify-content-between">
                                <div>
                                    <h4 className="mb-3">
                                        <FaUser className="me-2" />
                                        {user.displayName || 'User'}

                                    </h4>
                                    <p className="mb-1">
                                        <strong>Email:</strong> {user.email}
                                    </p>
                                    <p>
                                        <strong>Joined:</strong> {user.joinedDate || 'N/A'}
                                    </p>
                                </div>
                                <Button variant="outline-danger" onClick={handleLogout}>
                                    <FaSignOutAlt className="me-2" />
                                    Logout
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <h5>Personal Information</h5>
                        <div className="card">
                            <div className="card-body">
                                <Row>
                                    <Col md={4}>
                                        <p>
                                            <FaIdBadge className="me-2" />
                                            <strong>Name:</strong> {editedDetails.name || 'N/A'}
                                        </p>
                                    </Col>
                                    <Col md={4}>
                                        <p>
                                            <FaPhoneAlt className="me-2" />
                                            <strong>Phone Number:</strong> {editedDetails.phoneNumber || 'N/A'}
                                        </p>
                                    </Col>
                                    <Col md={4}>
                                        <p>
                                            <FaBirthdayCake className="me-2" />
                                            <strong>Date of Birth:</strong> {editedDetails.dateOfBirth || 'N/A'}
                                        </p>
                                    </Col>
                                    <Col md={4}>
                                        <p>
                                            <FaTint className="me-2" />
                                            <strong>Blood Group:</strong> {editedDetails.bloodGroup || 'N/A'}
                                        </p>
                                    </Col>
                                </Row>
                                <Button variant="outline-primary" onClick={handleShowEditModal}>
                                    <FaEdit className="me-2" />
                                    Edit
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <motion.h5 initial="hidden" animate="visible" variants={moodVariants}>
                            Current Mood
                        </motion.h5>
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex align-items-center justify-content-center">
                                    <motion.div
                                        className="text-center mt-2"
                                        initial="hidden"
                                        animate="visible"
                                        variants={moodVariants}
                                    >
                                        {mood === 'Well' && <FaSmile className="text-success" size={50} />}
                                        {mood === 'Neutral' && <FaMeh className="text-warning" size={50} />}
                                        {mood === 'Struggling' && <FaFrown className="text-danger" size={50} />}
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <h5>Mental Health Overview</h5>
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex align-items-center justify-content-center">
                                    <motion.div
                                        initial="hidden"
                                        animate="visible"
                                        variants={moodVariants}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <Pie data={mentalHealthData} options={pieChartOptions} />
                                    </motion.div>
                                </div>
                                <br />

                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Modal show={showEditModal} onHide={handleCloseEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your full name"
                                value={editedDetails.name}
                                onChange={(e) => setEditedDetails({ ...editedDetails, name: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPhoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your phone number"
                                value={editedDetails.phoneNumber}
                                onChange={(e) => setEditedDetails({ ...editedDetails, phoneNumber: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formDateOfBirth">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your date of birth"
                                value={editedDetails.dateOfBirth}
                                onChange={(e) => setEditedDetails({ ...editedDetails, dateOfBirth: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBloodGroup">
                            <Form.Label>Blood Group</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your blood group"
                                value={editedDetails.bloodGroup}
                                onChange={(e) => setEditedDetails({ ...editedDetails, bloodGroup: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEditModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveChanges}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Profile;
