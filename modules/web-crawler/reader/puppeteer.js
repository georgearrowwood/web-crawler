const puppeteer = require('puppeteer');

class PuppeteerReader {
  constructor(host) {
    this.reader = puppeteer;
    this.host = host;
  }

  async read(uri) {
    const browser = await this.reader.launch();
    const page = await browser.newPage();
    await page.goto(host + uri);
    return page.content();
  }
};

module.exports = PuppeteerReader;