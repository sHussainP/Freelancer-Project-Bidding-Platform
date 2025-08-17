import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const ClientDashboard = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ title: '', description: '', budget: '', deadline: '' });
    const navigate = useNavigate();

    const fetchProjects = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axiosInstance.get('/api/projects/client', {
                headers: { 'x-auth-token': token }
            });
            setProjects(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err.response.data);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axiosInstance.post('/api/projects', formData, {
                headers: { 'x-auth-token': token }
            });
            alert('Project posted successfully!');
            setFormData({ title: '', description: '', budget: '', deadline: '' }); // Clear form
            fetchProjects(); // Refresh projects list
        } catch (err) {
            console.error(err.response.data);
            alert('Error posting project.');
        }
    };
    
    // Logout function
    const onLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Client Dashboard</h1>
                <button onClick={onLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
            </div>
            
            <div className="mb-8 p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Post a New Project</h2>
                <form onSubmit={onSubmit} className="space-y-4">
                    <input type="text" name="title" value={formData.title} onChange={onChange} placeholder="Project Title" required className="w-full p-2 border rounded" />
                    <textarea name="description" value={formData.description} onChange={onChange} placeholder="Project Description" required className="w-full p-2 border rounded"></textarea>
                    <input type="number" name="budget" value={formData.budget} onChange={onChange} placeholder="Budget" required className="w-full p-2 border rounded" />
                    <input type="date" name="deadline" value={formData.deadline} onChange={onChange} placeholder="Deadline" required className="w-full p-2 border rounded" />
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Post Project</button>
                </form>
            </div>
            
            <div>
                <h2 className="text-2xl font-semibold mb-4">My Posted Projects</h2>
                {projects.length > 0 ? (
                    <div className="space-y-4">
                        {projects.map(project => (
                            <div key={project._id} className="p-4 bg-white rounded-lg shadow-md">
                                <h3 className="text-xl font-bold">{project.title}</h3>
                                <p>{project.description}</p>
                                <p className="text-gray-600">Budget: ${project.budget}</p>
                                <p className="text-gray-600">Status: <span className="font-semibold capitalize">{project.status}</span></p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>You have not posted any projects yet.</p>
                )}
            </div>
        </div>
    );
};

export default ClientDashboard;