const WebCrawler = require('./modules/web-crawler');

var args = process.argv.slice(2);

(async () => {
  try {
    const host = args[0];
    const uri = args[1];

    const crawler = new WebCrawler({ host, reader: 'axios', parser: 'cheerio', pagesLimit: 25 });
    await crawler.parse(uri);

    await crawler.export('json');
    
  } catch (e) {
    console.log(e);
  }
})();