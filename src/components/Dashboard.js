import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
    faBullseye,
    faUserMd,
    faChartLine,
    faCalendarAlt,
    faCheckCircle,
    faHeartbeat,
    faStethoscope,
    faNotesMedical,
    faLightbulb,
    faClock,
} from '@fortawesome/free-solid-svg-icons';
import { getProtectedResource } from '../services/api';

const Dashboard = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const data = await getProtectedResource(token);
                setMessage(data.message);
            } catch (err) {
                setMessage('Failed to fetch protected resource');
            }
        };

        fetchData();
    }, []);

    const [goals, setGoals] = useState([]);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Fetch user goals and progress from the backend
        // Replace the placeholder URL with your actual API endpoint
        fetch('http://localhost:5000/api/goals', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                setGoals(data.goals);
                setProgress(data.progress);
            })
            .catch(error => console.error('Error fetching goals and progress:', error));
    }, []);

    const addGoal = async (newGoal) => {
        try {
            const response = await fetch('http://localhost:5000/api/goals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ description: newGoal }),
            });

            const responseData = await response.json();

            if (response.ok) {
                const updatedGoals = [...goals, responseData.goal];
                setGoals(updatedGoals);
            } else {
                console.error('Error adding goal:', responseData.message);
                // Handle error
            }
        } catch (error) {
            console.error('Error adding goal:', error.message);
        }
    };

    const updateGoal = async (goalId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/goals/${goalId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ description: 'Updated Description' }), // Replace with the updated description
            });

            const responseData = await response.json();

            if (response.ok) {
                const updatedGoals = goals.map((goal) =>
                    goal._id === goalId ? responseData.goal : goal
                );
                setGoals(updatedGoals);
            } else {
                console.error('Error updating goal:', responseData.message);
                // Handle error
            }
        } catch (error) {
            console.error('Error updating goal:', error.message);
        }
    };

    const deleteGoal = async (goalId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/goals/${goalId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            const responseData = await response.json();

            if (response.ok) {
                const updatedGoals = goals.filter((goal) => goal._id !== goalId);
                setGoals(updatedGoals);
            } else {
                console.error('Error deleting goal:', responseData.message);
                // Handle error
            }
        } catch (error) {
            console.error('Error deleting goal:', error.message);
        }
    };


    const initiateAppointment = (therapistId) => {
        // Placeholder for initiating appointment scheduling
        console.log(`Initiate appointment with therapist ${therapistId}`);
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-lg-8">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h3 className="card-title">
                                <FontAwesomeIcon icon={faBullseye} className="mr-2" />
                                Your Goals
                            </h3>
                            <ul className="list-group">
                                {goals.map((goal) => (
                                    <li key={goal._id} className="list-group-item">
                                        <FontAwesomeIcon icon={faCheckCircle} className="mr-2 text-success" />
                                        {goal.description}
                                        <button onClick={() => updateGoal(goal._id)}>Update</button>
                                        <button onClick={() => deleteGoal(goal._id)}>Delete</button>
                                    </li>
                                ))}
                            </ul>

                            <form
                                className="mt-3"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const newGoal = e.target.elements.goal.value;
                                    if (newGoal) {
                                        addGoal(newGoal);
                                        e.target.reset();
                                    }
                                }}
                            >
                                <div className="form-group">
                                    <div className="input-group">
                                        <input type="text" className="form-control" name="goal" />
                                        <div className="input-group-append">
                                            <button type="submit" className="btn btn-success">
                                                <FontAwesomeIcon icon={faPlus} /> Add Goal
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="card mb-4">
                        <div className="card-body">
                            <h3 className="card-title">
                                <FontAwesomeIcon icon={faNotesMedical} className="mr-2" />
                                Health Notes
                            </h3>
                            <p className="card-text">
                                Keep track of your health-related notes and observations. This section can be used to jot
                                down any thoughts or experiences related to your well-being.
                            </p>
                            <button className="btn btn-primary">View Health Notes</button>
                        </div>
                    </div>

                    <div className="card mb-4">
                        <div className="card-body">
                            <h3 className="card-title">
                                <FontAwesomeIcon icon={faLightbulb} className="mr-2" />
                                Wellness Tips
                            </h3>
                            <p className="card-text">
                                Explore wellness tips and advice to improve your mental and physical well-being.
                            </p>
                            <button className="btn btn-primary">Explore Tips</button>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title">
                                <FontAwesomeIcon icon={faClock} className="mr-2" />
                                Upcoming Appointments
                            </h3>
                            <p className="card-text">You have no upcoming appointments.</p>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h3 className="card-title">
                                <FontAwesomeIcon icon={faChartLine} className="mr-2" />
                                Your Progress
                            </h3>
                            <div className="progress">
                                <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={{ width: `${progress}%` }}
                                    aria-valuenow={progress}
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                >
                                    {progress}%
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title">
                                <FontAwesomeIcon icon={faUserMd} className="mr-2" />
                                Connect with a Therapist
                            </h3>
                            <p className="card-text">
                                Looking for professional help? Connect with a therapist to discuss your mental well-being.
                            </p>
                            <button
                                className="btn btn-primary"
                                onClick={() => initiateAppointment('therapistId')}
                            >
                                Find a Therapist
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
