const Puppeteer = require('./puppeteer');
const Axios = require('./axios');

module.exports = (readerType, host) => {
  if (readerType === 'puppeteer') {
    return new Puppeteer(host);
  }
  return new Axios(host);
}  