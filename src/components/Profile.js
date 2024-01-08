import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';
import { ProgressBar, Modal, Button, Form } from 'react-bootstrap';
import {
    FaUser,
    FaSignOutAlt,
    FaSmile,
    FaFrown,
    FaMeh,
    FaChartPie,
    FaEdit,
} from 'react-icons/fa';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

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
                data: [70, 20, 10], // Replace with actual mental health data percentages
                backgroundColor: ['#28a745', '#ffc107', '#dc3545'],
            },
        ],
    });

    useEffect(() => {
        // Redirect to the login page if the user is not authenticated
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleLogout = async () => {
        try {
            await logOut();
            // After logout, navigate to the home page or login page
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

    const handleSaveChanges = () => {
        // Add logic to save the edited details to the backend
        // Update the user object with the edited details
        // For now, just close the modal
        setShowEditModal(false);
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

    // Determine mood (static for illustration purposes)
    const mood = 'Well'; // Replace with actual mood based on mental health data

    return (
        <div className="container mt-4">
            <h2>Your Profile</h2>
            {user && (
                <div>
                    <div className="card mb-4">
                        <div className="card-body text-center">
                            <FaUser size={80} className="mb-3" />
                            <h3>{user.displayName || user.email}</h3>
                            <p>{user.email}</p>
                        </div>
                    </div>

                    <div className="card mb-4">
                        <div className="card-body">
                            <h3 className="card-title">Account Details</h3>
                            <p className="card-text">Username: {user.displayName}</p>
                            <p className="card-text">Email: {user.email}</p>
                        </div>
                    </div>

                    <div className="card mb-4">
                        <div className="card-body">
                            <h3 className="card-title">Mental Health Progress</h3>
                            <ProgressBar now={70} label="70%" />
                            {/* Add the Pie Chart here */}
                            <div className="mt-3">
                                <Pie data={mentalHealthData} options={pieChartOptions} />
                            </div>
                        </div>
                    </div>

                    <div className="card mb-4 shadow-lg">
                        <div className="card-body text-center">
                            <h3 className="card-title">Mood</h3>
                            {mood === 'Well' && <FaSmile size={50} color="#28a745" />}
                            {mood === 'Neutral' && <FaMeh size={50} color="#ffc107" />}
                            {mood === 'Struggling' && <FaFrown size={50} color="#dc3545" />}
                        </div>
                    </div>

                    <div className="card mb-4 shadow-lg">
                        <div className="card-body text-center">
                            <FaChartPie size={50} className="mb-3" />
                            <h3>Additional Information</h3>
                            <Button variant="outline-primary" onClick={handleShowEditModal}>
                                <FaEdit className="me-2" />
                                Edit Details
                            </Button>
                        </div>
                    </div>

                    {/* Edit Details Modal */}
                    <Modal show={showEditModal} onHide={handleCloseEditModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group className="mb-3" controlId="phoneNumber">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter phone number"
                                        value={editedDetails.phoneNumber}
                                        onChange={(e) =>
                                            setEditedDetails({
                                                ...editedDetails,
                                                phoneNumber: e.target.value,
                                            })
                                        }
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="dateOfBirth">
                                    <Form.Label>Date of Birth</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter date of birth"
                                        value={editedDetails.dateOfBirth}
                                        onChange={(e) =>
                                            setEditedDetails({
                                                ...editedDetails,
                                                dateOfBirth: e.target.value,
                                            })
                                        }
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="bloodGroup">
                                    <Form.Label>Blood Group</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter blood group"
                                        value={editedDetails.bloodGroup}
                                        onChange={(e) =>
                                            setEditedDetails({
                                                ...editedDetails,
                                                bloodGroup: e.target.value,
                                            })
                                        }
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

                    <div className="text-center">
                        <button className="btn btn-danger" onClick={handleLogout}>
                            <FaSignOutAlt className="me-2" />
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
