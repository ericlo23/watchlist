const axios = require('axios');

async function postPrices(env, apiKey, prices) {
  const url = `https://api.xplatform.tranx.io/${env}/watchlist`
  const headers = {
    "x-api-key": apiKey,
    "Content-Type": "application/json"
  }
  
  const response = await axios.post(url, prices, { headers });
  return response.data;
}

exports.postPrices = postPrices;
