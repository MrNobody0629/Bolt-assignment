const dotenv = require('dotenv');
const axios = require('axios');
dotenv.config();

module.exports = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  BASE_URL: process.env.BASE_URL || 'https://www.dnd5eapi.co',
  axios
};