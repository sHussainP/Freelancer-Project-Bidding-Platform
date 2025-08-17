const express = require('express');
const router = express.Router();
const auth = require('../../middleware/authMiddleware'); // Import auth middleware
const Project = require('../../models/Project'); // Import Project model
const Bid = require('../../models/Bid'); // Import Bid model

// @route   POST api/projects
// @desc    Create a new project
// @access  Private (Client)
router.post('/', auth, async (req, res) => {
    try {
        // Ensure the user is a client
        if (req.user.role !== 'client') {
            return res.status(403).json({ msg: 'Authorization denied. Only clients can post projects.' });
        }

        const { title, description, budget, deadline } = req.body;

        const newProject = new Project({
            title,
            description,
            budget,
            deadline,
            client: req.user.id
        });

        const project = await newProject.save();
        res.json(project);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/projects/client
// @desc    Get all projects for the authenticated client
// @access  Private (Client)
router.get('/client', auth, async (req, res) => {
    try {
        const projects = await Project.find({ client: req.user.id }).sort({ date: -1 });
        res.json(projects);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/projects
// @desc    Get all available projects
// @access  Public
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find().sort({ date: -1 });
        res.json(projects);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/projects/:projectId/bid
// @desc    Submit a bid on a project
// @access  Private (Freelancer)
router.post('/:projectId/bid', auth, async (req, res) => {
    try {
        // Ensure the user is a freelancer
        if (req.user.role !== 'freelancer') {
            return res.status(403).json({ msg: 'Authorization denied. Only freelancers can bid on projects.' });
        }

        const project = await Project.findById(req.params.projectId);
        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }

        // Check if the freelancer is the owner of the project
        if (project.client.toString() === req.user.id) {
            return res.status(400).json({ msg: 'Cannot bid on your own project' });
        }

        const newBid = new Bid({
            bidder: req.user.id,
            project: req.params.projectId,
            amount: req.body.amount,
            coverLetter: req.body.coverLetter
        });

        const bid = await newBid.save();
        res.json(bid);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/projects/:projectId/accept-bid/:bidId
// @desc    Accept a bid on a project
// @access  Private (Client)
router.put('/:projectId/accept-bid/:bidId', auth, async (req, res) => {
    try {
        // 1. Ensure the user is a client
        if (req.user.role !== 'client') {
            return res.status(403).json({ msg: 'Authorization denied. Only clients can accept bids.' });
        }

        // 2. Find the project and the bid by their IDs
        const project = await Project.findById(req.params.projectId);
        const bid = await Bid.findById(req.params.bidId);

        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }

        if (!bid) {
            return res.status(404).json({ msg: 'Bid not found' });
        }

        // 3. Ensure the project belongs to the authenticated client
        if (project.client.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized to manage this project' });
        }

        // 4. Ensure the bid is for the correct project
        if (bid.project.toString() !== req.params.projectId) {
            return res.status(400).json({ msg: 'Bid does not belong to this project' });
        }
        
        // 5. Check if the project is already "in-progress" or "completed"
        if (project.status !== 'open') {
             return res.status(400).json({ msg: 'Project is no longer open for bids.' });
        }

        // 6. Update the project status to 'in-progress'
        project.status = 'in-progress';
        await project.save();
        
        // 7. Update the accepted bid status to 'accepted'
        bid.status = 'accepted';
        await bid.save();

        // 8. Find and update all other bids on this project to 'rejected'
        await Bid.updateMany(
            { project: req.params.projectId, _id: { $ne: req.params.bidId } },
            { $set: { status: 'rejected' } }
        );

        res.json({ msg: 'Bid accepted successfully', project, acceptedBid: bid });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;