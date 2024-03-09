const axios = require("axios");

async function getUsdToTwd() {
  try {
    const response = await axios.get(
      "https://api.exchangerate-api.com/v4/latest/USD"
    );
    return response.data.rates.TWD;
  } catch (error) {
    console.error(error);
  }
}

exports.getUsdToTwd = getUsdToTwd;
