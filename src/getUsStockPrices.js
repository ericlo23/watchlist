const axios = require("axios");
const { FMP_API_KEY } = require("./constants");

async function getUsStockPrices(symbols) {
  try {
    const params = new URLSearchParams({
      apikey: FMP_API_KEY,
    });
    const url = `https://financialmodelingprep.com/api/v3/quote-short/${symbols.join(
      ","
    )}?${params}`;
    const response = await axios.get(url, {});

    return symbols.reduce((acc, symbol) => {
      const stock = response.data.find((stock) => stock.symbol === symbol);
      acc[symbol] = stock ? stock.price : null;
      return acc;
    }, {});
  } catch (error) {
    console.error(error);
  }
}

exports.getUsStockPrices = getUsStockPrices;
