const express = require('express');
const cors = require('cors');
require('dotenv').config();

const ordersRouter = require('./routes/orders');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', ordersRouter);

app.get('/', (_req, res) => {
  res.json({ message: 'Backend is running.' });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});