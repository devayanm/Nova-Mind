import React from 'react';
import { Link } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { useState, useEffect } from 'react';
import { FaUsers, FaCogs, FaBrain } from 'react-icons/fa';


const Home = () => {
    const [mentalHealthData, setMentalHealthData] = useState({
        labels: ['Affected', 'Not Affected'],
        datasets: [
            {
                data: [70, 30],
                backgroundColor: ['#dc3545', '#28a745'],
            },
        ],
    });

    const pieChartOptions = {
        maintainAspectRatio: false,
        height: 200,
        width: 200,
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return (
        <div>
            <section className="hero text-center text-white bg-primary py-5">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6 text-md-left">
                            <h1 className="display-4">Mental Wellness Hub</h1>
                            <p className="lead">Empowering Your Mental Health Journey</p>
                            <Link to="/resources" className="btn btn-light btn-lg">
                                Explore Resources
                            </Link>
                        </div>
                        <div className="col-md-6">
                            <img src="./img/hero-img.png" alt="Mental Wellness" className="img-fluid" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-5">
                <div className="container">
                    <div className="row text-center d-flex align-items-center">
                        <div className="col-lg-6">
                            <h2 className="display-4 text-primary">Who We Are</h2>
                            <p className="lead">
                                We are a dedicated team passionate about mental health and wellness. Our mission is to provide
                                resources, support, and guidance to help individuals on their mental health journey.
                            </p>
                        </div>
                        <div className="col-lg-6">
                            <img
                                src="./img/img.png"
                                alt="Who We Are"
                                className="img-fluid rounded"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-light py-5">
                <div className="container">
                    <div className="row flex-row-reverse d-flex align-items-center">
                        <div className="col-lg-6 text-center">
                            <h2 className="display-4 text-primary">What We Do</h2>
                            <p className="lead">
                                We provide a comprehensive platform with resources, articles, webinars, and support
                                networks to empower individuals in their mental health journey.
                            </p>
                        </div>
                        <div className="col-lg-6">
                            <img
                                src="./img/img1.png"
                                alt="What We Do"
                                className="img-fluid rounded"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-5">
                <div className="container">
                    <h2 className="display-4 text-center text-primary">Our Mission</h2>
                    <p className="lead text-center">
                        Our mission is to break the stigma surrounding mental health, promote awareness, and provide
                        accessible resources to everyone seeking support. We believe in the transformative power of
                        community and self-discovery. Together, we embark on a journey to embrace the uniqueness
                        of each individual, fostering a world where mental well-being is a celebrated part of
                        the human experience.
                    </p>
                    <p className="lead text-center">
                        Join us as we strive to create a safe space for vulnerability, growth, and empowerment. Let's
                        rewrite the narrative surrounding mental health and embark on a collective journey towards
                        a brighter, more compassionate future.
                    </p>
                </div>
            </section>

            <section className="py-5">
                <div className="container">
                    <h2 className="display-4 text-center text-primary">Mental Health Statistics</h2>
                    <p className="lead text-center">
                        Explore real-time feedback on the impact of mental health on individuals. Our community actively contributes to
                        these statistics, fostering awareness and understanding.
                    </p>
                    <div className="text-center">
                        <Pie data={mentalHealthData} options={pieChartOptions} />
                    </div>
                    <div className="text-center mt-4">
                        <p className="lead">
                            Want to dive deeper into mental health statistics? Click the button below.
                        </p>
                        <Link to="/mental-health-statistics" className="btn btn-primary btn-lg">
                            View Detailed Statistics
                        </Link>
                    </div>
                </div>
            </section>

            <section className="services-section bg-light py-5">
                <div className="container">
                    <h2 className="section-heading text-center text-primary mb-5">What We Offer</h2>
                    <div className="card-deck">
                        <div className="card service-card">
                            <div className="card-body text-center">
                                <FaUsers className="fs-3x mb-3 service-icon" />
                                <h5 className="card-title">Online Support Groups</h5>
                                <p className="card-text">
                                    Connect with others who share similar experiences.
                                </p>
                            </div>
                        </div>

                        <div className="card service-card">
                            <div className="card-body text-center">
                                <FaCogs className="fs-3x mb-3 service-icon" />
                                <h5 className="card-title">Wellness Workshops</h5>
                                <p className="card-text">
                                    Participate in workshops to enhance your well-being.
                                </p>
                            </div>
                        </div>

                        <div className="card service-card">
                            <div className="card-body text-center">
                                <FaBrain className="fs-3x mb-3 service-icon" />
                                <h5 className="card-title">Mindfulness Meditation</h5>
                                <p className="card-text">
                                    Learn mindfulness techniques for mental clarity.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-light py-5">
                <div className="container">
                    <h2 className="display-4 text-center text-primary">Join Us</h2>
                    <p className="lead text-center">
                        Join our community of mental health advocates. Together, we can make a positive impact on mental
                        wellness.
                    </p>
                    <div className="text-center">
                        <Link to="/register" className="btn btn-primary btn-lg">
                            Get Started
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-5">
                <div className="container">
                    <h2 className="display-4 text-center text-primary">Crisis Helpline Numbers</h2>
                    <p className="lead text-center">
                        In case of emergency, reach out to the following helpline numbers:
                    </p>
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">National Suicide Prevention Lifeline: 1-800-273-TALK (8255)</li>
                                <li className="list-group-item">Crisis Text Line: Text "HOME" to 741741</li>
                                <li className="list-group-item">Veterans Crisis Line: 1-800-273-8255 (Press 1)</li>
                            </ul>
                        </div>
                    </div>
                    <div className="text-center mt-4">
                        <Link to="/emergency-help" className="btn btn-danger btn-lg">
                            Extreme Emergency Help
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;