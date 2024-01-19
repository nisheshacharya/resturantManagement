const express = require('express');
const userRouter = require('./routes/userRouter');
const restaurantRouter = require('./routes/restaurantRouter'); // Import restaurantRouter
const cors = require('cors')
const bodyParser = require('body-parser')

const { connectToDB } = require('./utils/database');

const app = express();

const host = 'localhost';
const port = process.env.PORT || 5001;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.json());
app.use(cors());
// Increase the payload size limit

app.use('/', userRouter);
app.use('/restuarants', restaurantRouter);

connectToDB()
  .then(() => {
    app.listen(port, host, () => {
      console.log(`Server is running on http://${host}:${port}/restuarants`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to the database:', err);
  });

