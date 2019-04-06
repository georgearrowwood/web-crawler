const WebCrawler = require('./modules/web-crawler');
const readerFactory = require('./modules/web-crawler/reader');
const parserFactory = require('./modules/web-crawler/parser');
const exportFactory = require('./modules/web-crawler/export');

var args = process.argv.slice(2);

(async () => {
  try {
    const host = args[0];
    const uri = args[1];

    if (!host) throw Error('host parameter not passed to web crawler');
    if (!uri) throw Error('uri parameter not passed to web crawler');

    const reader = readerFactory('axios', host);
    const parser = parserFactory('cheerio');

    const crawler = new WebCrawler({ reader, parser, pagesLimit: 400 });
    await crawler.parse(uri);

    const exporter = exportFactory('json');
    await crawler.export(exporter);
    
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
})();