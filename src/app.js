const cors = require('cors');
const express = require('express');
const app = express();

const corsOptions = {
  origin: 'https://events-scheduler.netlify.app',  
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));


app.options('*', cors(corsOptions));
