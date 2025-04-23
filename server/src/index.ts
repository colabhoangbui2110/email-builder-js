import express from 'express';

import renderRoutes from './routes/render';

const app = express();
const port = process.env.PORT || 3001; // Use port 3001 or environment variable

// Middleware to parse JSON bodies
app.use(express.json({ limit: '50mb' })); // Increase limit if documents are large

// Mount the render routes
app.use('/api', renderRoutes); // Prefix routes with /api

app.get('/', (req, res) => {
  res.send('Email Builder API Server is running!');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});