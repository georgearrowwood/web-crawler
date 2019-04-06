const Cheerio = require('./cheerio');

module.exports = (parserType) => {
  switch (parserType) {
    case 'cheerio':
      return new Cheerio();
    default:
      throw Error('Invalid crawler parser type');  
  }
}  