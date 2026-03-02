require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const ProjectRequest = require('./models/ProjectRequest');

const app = express();
const PORT = process.env.PORT || 5000;

// Admin Credentials (Hardcoded for this project)
const ADMIN_EMAIL = 'Admin@gmail.com';
const ADMIN_PASSWORD = '12345';

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://infantashil55_db_user:1234567890@projecthub.5foz5jb.mongodb.net/?appName=projecthub';
mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB Atlas'))
    .catch((error) => console.error('❌ MongoDB connection error:', error));

// Root Health Check Route
app.get('/', (req, res) => {
    res.json({ message: 'ProjectHub API is running!' });
});

// Routes
app.post('/api/projects', async (req, res) => {
    try {
        const {
            fullName,
            collegeName,
            department,
            yearOfStudy,
            phone,
            email,
            projectType,
            projectDomain,
            description
        } = req.body;

        // Basic required field validation
        if (!fullName || !collegeName || !department || !yearOfStudy || !phone || !email || !projectType || !projectDomain) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const newProjectRequest = new ProjectRequest({
            fullName,
            collegeName,
            department,
            yearOfStudy,
            phone,
            email,
            projectType,
            projectDomain,
            description
        });

        await newProjectRequest.save();

        res.status(201).json({ message: 'Project request saved successfully', project: newProjectRequest });
    } catch (error) {
        console.error('Error saving project request:', error);
        res.status(500).json({ error: 'Internal server error while saving the request' });
    }
});

app.get('/api/colleges/search', (req, res) => {
    const query = (req.query.q || '').toLowerCase().trim();
    if (!query) return res.json([]);

    const results = [];
    const csvFilePath = path.join(__dirname, 'database_maro0f.csv');

    // Create a read stream that will safely abort after 15 results
    const readStream = fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (data) => {
            let collegeName = data['College Name'] || '';
            let universityName = data['University Name'] || '';

            // Clean the names by removing the " (Id: XYZ)" part using regex
            collegeName = collegeName.replace(/\s*\(Id:\s*[^)]+\)/i, '').trim();
            universityName = universityName.replace(/\s*\(Id:\s*[^)]+\)/i, '').trim();

            if (collegeName.toLowerCase().includes(query) || universityName.toLowerCase().includes(query)) {
                // Ensure unique values
                if (!results.includes(collegeName)) {
                    results.push(collegeName);
                }
            }

            if (results.length >= 15) {
                // Return early, destroying the stream
                readStream.destroy();
                res.json(results);
            }
        })
        .on('end', () => {
            // If we hit the end before 15 results, return what we have
            if (!res.headersSent) {
                res.json(results);
            }
        })
        .on('error', (err) => {
            console.error('CSV Parsing Error:', err);
            if (!res.headersSent) {
                res.status(500).json({ error: 'Error reading college data.' });
            }
        });
});

// Admin Routes
app.post('/api/admin/login', (req, res) => {
    const { email, password } = req.body;

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        res.json({ message: 'Login successful', token: 'admin-session-token-123' });
    } else {
        res.status(401).json({ error: 'Invalid email or password' });
    }
});

app.get('/api/admin/projects', async (req, res) => {
    try {
        const projects = await ProjectRequest.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: 'Failed to fetch project data' });
    }
});

// Start Server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
});
