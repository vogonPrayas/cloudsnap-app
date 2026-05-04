const express = require('express');
const path = require('path');
const app = express();

// Serve static files
app.use(express.static(__dirname));

// Route all requests to index.html for SPA behavior
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Use PORT from environment or default to 8080
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`CloudSnap running on port ${PORT}`);
});
