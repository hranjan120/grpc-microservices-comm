const express = require('express');

const userServer = require('./grpc/userServer');
/*
*-------------------------Include routes----------------------
*/
const userRoutes = require('./routes/userRoutes');


/*
*---------------------Middleware section-------------------
*/
const app = express();
app.enable('trust proxy');
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept, Authorization, Channel');
  next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


/*------------------------------------------*/
// mainProtoApp();
/*------------------------------------------*/
app.use('/v1', (req, res, next) => {
  next();
}, userRoutes);


/*--------------------------------------------*/
app.get('*', async (req, res) => {
  const ip = req.headers['x-forwarded-for'];
  res.status(404).json({ statusCode: 'FAIL', statusValue: 404, message: 'Requested url is not available..', ipAddress: ip });
});

/*
*----------------------------------------------------------------------------
*/
const port = process.env.PORT || 8001;
app.listen(port, () => {
  console.log(`User Server started on port ${port}`);
});
