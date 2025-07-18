const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const profileRoutes = require('./routes/profileRoutes');

const port = 3000;
const basePath = '/iprofile/api/v1';

const app = express();
app.use(cors());
app.use(express.json());

app.get(`${basePath}/info`, (req, res) => {
  res.status(200).json({ message: 'Bienvenido al servicio iprofile' });
});

//app.use(morgan('dev')); // Para un formato de registro simple
// O para un formato personalizado:
app.use(morgan(':method :url :status :response-time ms'));

app.use(basePath, profileRoutes);

app.listen(port, () => {
  var server = require('os').hostname();
  console.log(`Server is running at ${server}:${port}`);
});