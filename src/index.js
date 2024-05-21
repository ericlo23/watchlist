const { getCryptoPrices } = require("./getCryptoPrices");
const { getTwStockPrices } = require("./getTwStockPrices");
const { getUsStockPrices } = require("./getUsStockPrices");
const { getUsdToTwd } = require("./getUsdToTwd");
const { postPrices } = require("./postPrices");
const { inspect } = require("util");
const {
  CRYPTO_SYMBOLS,
  TW_STOCK_SYMBOLS,
  US_STOCK_SYMBOLS,
  DEVELOP_XPLATFORM_API_KEY,
  ERICLO_XPLATFORM_API_KEY,
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
  const [cryptoPrices, twStockPrices, usStockPrices, usdPrice] =
    await getPrices();

  const price = {
    ...cryptoPrices,
    ...twStockPrices,
    ...usStockPrices,
    USD: usdPrice,
  };
  console.log(inspect(price, { depth: null }));

  const res = await Promise.all([
    postPrices("develop", DEVELOP_XPLATFORM_API_KEY, price),
    postPrices("ericlo", ERICLO_XPLATFORM_API_KEY, price),
  ]);
  console.log(res);
};
