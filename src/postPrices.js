const axios = require('axios');
const { XPLATFORM_API_KEY } = require('./constants');

async function postPrices(prices) {
  const url = "https://api.xplatform.tranx.io/develop/watchlist"
  const headers = {
    "x-api-key": XPLATFORM_API_KEY,
    "Content-Type": "application/json"
  }
  
  const response = await axios.post(url, prices, { headers });
  return response.data;
}

exports.postPrices = postPrices;
