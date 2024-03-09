const { getCryptoPrices } = require("./getCryptoPrices");
const { getTwStockPrices } = require("./getTwStockPrices");
const { getUsStockPrices } = require("./getUsStockPrices");
const { getUsdToTwd } = require("./getUsdToTwd");
const { inspect } = require("util");
const {
  CRYPTO_SYMBOLS,
  TW_STOCK_SYMBOLS,
  US_STOCK_SYMBOLS,
} = require("./constants");

async function getPrices() {
  return Promise.all([
    getCryptoPrices(CRYPTO_SYMBOLS.split(",")),
    getTwStockPrices(TW_STOCK_SYMBOLS.split(",")),
    getUsStockPrices(US_STOCK_SYMBOLS.split(",")),
    getUsdToTwd(),
  ]);
}

exports.handler = async (event) => {
  const [cryptoPrices, twStockPrices, usStockPrices, twdPrice] =
    await getPrices();

  const price = {
    ...cryptoPrices,
    ...twStockPrices,
    ...usStockPrices,
    TWD: twdPrice,
  };
  console.log(inspect(price, { depth: null }));
};
