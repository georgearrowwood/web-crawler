const Puppeteer = require('./puppeteer');
const Axios = require('./axios');

module.exports = (readerType, host) => {
  switch (readerType) {
    case 'puppeteer':
      return new Puppeteer(host);
    case 'axios':
      return new Axios(host);  
    default:
      throw Error('Invalid crawler reader type');  
  }
} 
