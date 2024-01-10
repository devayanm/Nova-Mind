import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';
import { ProgressBar, Modal, Button, Form } from 'react-bootstrap';
import { FaUser, FaSignOutAlt, FaSmile, FaFrown, FaMeh, FaChartPie, FaEdit } from 'react-icons/fa';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import axios from 'axios';

const Profile = () => {
    const { user, logOut } = useUserAuth();
    const navigate = useNavigate();
    const [showEditModal, setShowEditModal] = useState(false);
    const [editedDetails, setEditedDetails] = useState({
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

    return (
        <div className="container mt-4">
            <h2>Your Profile</h2>
            {user && (
                <div>
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex align-items-center justify-content-between">
                                <div>
                                    <h4>
                                        <FaUser className="me-2" />
                                        {user.displayName || 'User'}
                                    </h4>
                                    <p>
                                        <strong>Email:</strong> {user.email}
                                    </p>
                                </div>
                                <Button variant="outline-danger" onClick={handleLogout}>
                                    <FaSignOutAlt className="me-2" />
                                    Logout
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <h5>Personal Information</h5>
                        <div className="card">
                            <div className="card-body">
                                <div>
                                    <p>
                                        <strong>Phone Number:</strong> {editedDetails.phoneNumber || 'N/A'}
                                    </p>
                                    <p>
                                        <strong>Date of Birth:</strong> {editedDetails.dateOfBirth || 'N/A'}
                                    </p>
                                    <p>
                                        <strong>Blood Group:</strong> {editedDetails.bloodGroup || 'N/A'}
                                    </p>
                                </div>
                                <Button variant="outline-primary" onClick={handleShowEditModal}>
                                    <FaEdit className="me-2" />
                                    Edit
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <h5>Mental Health Overview</h5>
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex align-items-center justify-content-center">
                                    <Pie data={mentalHealthData} options={pieChartOptions} />
                                </div>
                                <div className="text-center mt-2">
                                    {mood === 'Well' && <FaSmile className="text-success" size={30} />}
                                    {mood === 'Neutral' && <FaMeh className="text-warning" size={30} />}
                                    {mood === 'Struggling' && <FaFrown className="text-danger" size={30} />}
                                </div>
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
