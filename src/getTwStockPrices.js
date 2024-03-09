const axios = require("axios");

async function getTwStockPrices(symbols) {
  try {
    const params = new URLSearchParams({
      ex_ch: symbols.map((symbol) => `tse_${symbol}.tw`).join("|"),
    });
    const url = `http://mis.twse.com.tw/stock/api/getStockInfo.jsp?${params}`;
    const response = await axios.get(url);

    return symbols.reduce((acc, symbol) => {
      const stock = response.data.msgArray.find((stock) => stock.c === symbol);
      if (stock) {
        acc[symbol] = +stock.z;
      }
      return acc;
    }, {});
  } catch (error) {
    console.error(error);
  }
}

exports.getTwStockPrices = getTwStockPrices;
