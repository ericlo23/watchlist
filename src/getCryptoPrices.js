const axios = require("axios");
const { COINMARKETCAP_API_KEY } = require("./constants");

async function getCryptoPrices(symbols) {
  try {
    const params = new URLSearchParams({
      aux: "volume_24h_reported",
      convert: "USD",
      symbol: symbols.join(","),
    });

    const response = await axios.get(
      `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?${params}`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": COINMARKETCAP_API_KEY,
        },
      }
    );

    return symbols.reduce((acc, symbol) => {
      acc[symbol] = response.data.data[symbol][0].quote.USD.price;
      return acc;
    }, {});
  } catch (error) {
    console.error(error);
  }
}

exports.getCryptoPrices = getCryptoPrices;
