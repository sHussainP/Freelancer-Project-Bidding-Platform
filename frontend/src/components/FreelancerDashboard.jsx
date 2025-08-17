import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const FreelancerDashboard = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchProjects = async () => {
        try {
            const res = await axiosInstance.get('/api/projects');
            setProjects(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    // Logout function
    const onLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Freelancer Dashboard</h1>
                <button onClick={onLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
            </div>
            
            <h2 className="text-2xl font-semibold mb-4">Available Projects</h2>
            {projects.length > 0 ? (
                <div className="space-y-4">
                    {projects.map(project => (
                        <div key={project._id} className="p-4 bg-white rounded-lg shadow-md">
                            <h3 className="text-xl font-bold">{project.title}</h3>
                            <p>{project.description}</p>
                            <p className="text-gray-600">Budget: ${project.budget}</p>
                            <p className="text-gray-600">Deadline: {new Date(project.deadline).toLocaleDateString()}</p>
                            <button className="mt-2 bg-green-500 text-white p-2 rounded hover:bg-green-600">Bid on Project</button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No projects are currently available for bidding.</p>
            )}
        </div>
    );
};

export default FreelancerDashboard;