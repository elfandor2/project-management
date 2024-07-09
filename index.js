const express = require('express');
const connectDb = require('./config/db.js');
const ProjectRoute = require('./routes/projectRoutes.js');
const TaskRoute = require('./routes/taskRoutes.js');
const app = express();

const port = 3000;

// Connect Database
// ============
const startServer = async () => {
    // Connect Database
    await connectDb();

    // Init Middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    // Define Routes
    app.use('/projects', ProjectRoute);
    app.use('/', TaskRoute);

    // Error handling middleware
    // app.use((err, req, res, next) => {
    //     console.error(err.stack);
    //     res.status(500).send('Error');
    // });

    app.listen(port, () => {
        console.log(`Server is running on port http://localhost:${port}`);
    });
};

startServer().catch(err => {
    console.error('Failed to start server:', err);
});