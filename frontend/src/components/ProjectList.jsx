import React, { useState } from 'react';
import axiosInstance from '../axiosConfig';

const ProjectList = ({ projects, fetchProjects }) => {
    const [bidData, setBidData] = useState({});
    const [bidAmount, setBidAmount] = useState({});

    const handleBidChange = (e) => {
        setBidData({ ...bidData, [e.target.name]: e.target.value });
    };
    
    const handleAmountChange = (e) => {
        setBidAmount({ ...bidAmount, [e.target.name]: e.target.value });
    };

    const handleBidSubmit = async (projectId) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'x-auth-token': token
                }
            };
            const body = {
                amount: bidAmount[projectId],
                coverLetter: bidData[projectId]
            };
            
            await axiosInstance.post(`/api/projects/${projectId}/bid`, body, config);
            alert('Bid submitted successfully!');
            
            // Refresh projects or update state
            fetchProjects();
        } catch (err) {
            console.error(err.response.data);
            alert('Error submitting bid.');
        }
    };

    return (
        <div className="space-y-4">
            {projects.map(project => (
                <div key={project._id} className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    <p className="mt-2 text-gray-700">{project.description}</p>
                    <p className="text-gray-600 mt-1">Budget: ${project.budget}</p>
                    <p className="text-gray-600">Deadline: {new Date(project.deadline).toLocaleDateString()}</p>
                    
                    <div className="mt-4 space-y-2">
                        <textarea
                            name={project._id}
                            placeholder="Your Cover Letter"
                            value={bidData[project._id] || ''}
                            onChange={handleBidChange}
                            className="w-full p-2 border rounded"
                            rows="3"
                        ></textarea>
                        <input
                            type="number"
                            name={project._id}
                            placeholder="Your Bid Amount"
                            value={bidAmount[project._id] || ''}
                            onChange={handleAmountChange}
                            className="w-full p-2 border rounded"
                        />
                        <button
                            onClick={() => handleBidSubmit(project._id)}
                            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
                        >
                            Submit Bid
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProjectList;