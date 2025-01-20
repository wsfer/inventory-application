const express = require('express');
const app = express();
const PORT = process.env.port || 3000;

app.set('view engine', 'ejs');

app.get('/', (req, res) => res.send('Hello'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));