const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const redisClient = require('./services/redisService');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./docs/swaggerConfig');
const { connectToKafka } = require('./apache-kafka/kafkaService');
const routes = require('./routes');
const config = require('./config/config');
const { connectToRabbitMQ } = require('./services/rabbitMQService');
const seedMongoData = require('./services/dataSeeder');
const startGrpcServer = require('./grpcServer');
const cors = require('cors');
const morgan = require('morgan');
const favicon = require('serve-favicon');

// Environment Variable Configuration
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const app = express();

// Favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// CORS
app.use(cors()); // Enable All CORS Requests

// Body Parser Middleware
app.use(express.json());

// Request Logging Middleware
app.use(morgan('dev')); // Logs all incoming requests to the console
