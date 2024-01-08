// src/components/Dashboard.js
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
            // Add new goal to the backend
            // Replace the placeholder URL with your actual API endpoint
            const response = await fetch('http://localhost:5000/api/goals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ goal: newGoal }),
            });

            if (response.status === 201) {
                const updatedGoals = [...goals, newGoal];
                setGoals(updatedGoals);
            } else {
                console.error('Error adding goal');
                // Handle error
            }
        } catch (error) {
            console.error('Error adding goal:', error);
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
                                {goals.map((goal, index) => (
                                    <li key={index} className="list-group-item">
                                        <FontAwesomeIcon icon={faCheckCircle} className="mr-2 text-success" />
                                        {goal}
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

                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title">
                                <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
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
