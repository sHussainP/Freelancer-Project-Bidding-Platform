import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import ProjectList from './ProjectList';

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
                <ProjectList projects={projects} fetchProjects={fetchProjects} />
            ) : (
                <p>No projects are currently available for bidding.</p>
            )}
        </div>
    );
};

export default FreelancerDashboard;