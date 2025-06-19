const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

const basePath = '/iprofile/api/v1';
const profileRoutes = require('./routes/profileRoutes');

app.use(cors());
app.use(express.json());

app.get(`${basePath}/`, (req, res) => {
  res.status(200).json({ message: 'Bienvenido al servicio iprofile' });
});

app.use(basePath, profileRoutes);

app.listen(port, () => {
  var server = require('os').hostname();
  console.log(`Server is running at ${server}:${port}`);
});