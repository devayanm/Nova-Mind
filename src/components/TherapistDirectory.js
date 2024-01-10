import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faClock, faUser } from '@fortawesome/free-solid-svg-icons';

const TherapistDirectory = () => {
    const [therapists, setTherapists] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/therapists')
            .then(response => response.json())
            .then(data => setTherapists(data))
            .catch(error => console.error('Error fetching therapists:', error));
    }, []);

    const exampleTherapists = [
        {
            _id: '1',
            name: 'Dr. Sarah Thompson',
            specialization: 'Clinical Psychologist',
            contact: 'sarah.thompson@example.com',
            description: 'Experienced clinical psychologist specializing in trauma and stress disorders.',
            availability: 'Available for in-person and online sessions.',
        },
        {
            _id: '2',
            name: 'John Doe, LMFT',
            specialization: 'Marriage and Family Therapist',
            contact: 'john.doe@example.com',
            description: 'Licensed Marriage and Family Therapist with expertise in relationship counseling.',
            availability: 'Accepting new clients for couples and family therapy.',
        },
        {
            _id: '3',
            name: 'Dr. Emma Rodriguez',
            specialization: 'Child and Adolescent Psychologist',
            contact: 'emma.rodriguez@example.com',
            description: 'Dedicated to supporting the mental health of children and adolescents.',
            availability: 'Child-friendly office and virtual appointments.',
        },
        {
            _id: '4',
            name: 'Alexandra Turner, LPC',
            specialization: 'Licensed Professional Counselor',
            contact: 'alexandra.turner@example.com',
            description: 'Empathetic counselor providing individual and group therapy for mental well-being.',
            availability: 'Flexible scheduling for personalized counseling sessions.',
        },
        {
            _id: '5',
            name: 'Dr. Christopher Evans',
            specialization: 'Clinical Neuropsychologist',
            contact: 'chris.evans@example.com',
            description: 'Specializing in neuropsychological assessments and cognitive-behavioral therapy.',
            availability: 'Conducts comprehensive neuropsychological evaluations.',
        },
    ];

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Therapist Directory</h2>
            <div className="row">
                {therapists.length > 0 ? (
                    therapists.map((therapist, index) => (
                        <div key={therapist._id} className="col-lg-4 mb-4">
                            <div className="card therapist-card h-100 border-0 shadow">
                                <div className="card-img-overlay-gradient">
                                    <img
                                        src={`https://via.placeholder.com/300x200/87CEFA/000000?text=${therapist.name}`}
                                        alt={therapist.name}
                                        className="card-img-top"
                                    />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title text-black">{therapist.name}</h5>
                                    <p className="card-text mb-2">
                                        <FontAwesomeIcon icon={faUser} className="mr-2" />
                                        Specialization: {therapist.specialization}
                                    </p>
                                    <p className="card-text mb-2">
                                        <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                                        Contact: {therapist.contact}
                                    </p>
                                    <p className="card-text mb-2">
                                        <FontAwesomeIcon icon={faClock} className="mr-2" />
                                        Availability: {therapist.availability}
                                    </p>
                                    <p className="card-text">{therapist.description}</p>
                                    <button className="btn btn-light">Contact Therapist</button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    exampleTherapists.map((therapist, index) => (
                        <div key={therapist._id} className="col-lg-4 mb-4">
                            <div className="card therapist-card h-100 border-0 shadow">
                                <div className="card-img-overlay-gradient">
                                    <img
                                        src={`https://via.placeholder.com/300x200/87CEFA/000000?text=${therapist.name}`}
                                        alt={therapist.name}
                                        className="card-img-top"
                                    />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title text-black">{therapist.name}</h5>
                                    <p className="card-text mb-2">
                                        <FontAwesomeIcon icon={faUser} className="mr-2" />
                                        Specialization: {therapist.specialization}
                                    </p>
                                    <p className="card-text mb-2">
                                        <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                                        Contact: {therapist.contact}
                                    </p>
                                    <p className="card-text mb-2">
                                        <FontAwesomeIcon icon={faClock} className="mr-2" />
                                        Availability: {therapist.availability}
                                    </p>
                                    <p className="card-text">{therapist.description}</p>
                                    <button className="btn btn-primary">Contact Therapist</button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default TherapistDirectory;
