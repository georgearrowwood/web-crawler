
class WebCrawler {
  constructor(options = {}){
    if (!options.reader) throw Error('reader parameter not passed to web crawler constructor');
    if (!options.parser) throw Error('parser parameter not passed to web crawler constructor');

    this.reader = options.reader;
    this.parser = options.parser;

    // how many pages are being read at one time
    this.jobsInBatch = options.jobsInBatch || 15;
    // total limit for pages to crawl
    this.pagesLimit = options.pagesLimit || 1000;
    //temporary hash tables, used to prevent looping or scanning
    // for fast checking
    // value true means this page was already been read
    this.linksTmp = {};
    this.imagesTmp = {};
    // queue of tasks to read links
    this.linksQueue = [];

    // final data output
    this.links = [];
    this.images = [];
    // number of pages scanned count
    this.pagesCount = 0;
  }

  // main function does initial scan
  async parse(uri){
    if (!uri) throw Error('no uri given to parse');
    this.links[uri] = false;
    await this.parsePage(uri);
    // scans untill there are items in the queue or exceeds total limit
    while (this.linksQueue.length > 0 && this.pagesCount < this.pagesLimit) {
      // runs scan by batches
      let batch = [];
      for (let i = 0; i < this.jobsInBatch && i < this.linksQueue.length && this.pagesLimit > this.pagesCount + i; i++) {
        batch.push(this.parsePage(this.linksQueue.pop()))
      }
      await Promise.all(batch);
    }
    // the end of scan, format data
    this.normalizeData();
  }

  // this scan function is iterated over each link
  async parsePage(uri, elements){
    try {
      const content = await this.reader.read(uri);
      this.parseAndSetHyperlinks(content);
      this.parseAndSetImages(content);
      this.linksTmp[uri] = true;
    } catch (e) {
      this.linksTmp[uri] = null;
    }  
    this.pagesCount++;
  }

  // get list of links from parsed page and set it to temp data
  parseAndSetHyperlinks(content) {
    this.getHyperLinks(content)
      .map(el => {
        if (!this.linksTmp.hasOwnProperty(el.href)) {
          this.linksTmp[el.href] = false;
          // create new job in queue only if this link has not yet been scanned
          this.linksQueue.push(el.href);
        } 
      });  
  }

  // initial selector of links from scan
  getHyperLinks(content) {
    return this.parser.getElementsProps(content, 'a', {href: true})
      .filter(el => el.href && el.href.substr(0,10) !== 'javascript' && el.href.substr(0,4) !== 'http' 
                    && el.href !== '#' && el.href.substr(el.href - 3) !== 'pdf')
  }

  // initial selector of images from scan
  getImages(content) {
    return this.parser.getElementsProps(content, 'img', {src: true})
      .filter(el => el.src !== undefined)
  }

  // get list of images from parsed page and set it to temp data
  parseAndSetImages(content) {
    this.getImages(content)
      .map(el => {
        if (!this.imagesTmp.hasOwnProperty(el.src)) {
          this.imagesTmp[el.src] = true;
        }
      });  
  }

  // format final data
  normalizeData() {
    this.links = Object.keys(this.linksTmp)
      .map(key => this.linksTmp[key] === true ? key : null)
      .filter(el => el)
      .sort((a, b) => a > b ? 1 : -1);
    
    this.linksTmp = {};
    
    this.images = Object.keys(this.imagesTmp)
      .map(key => key)
      .filter(el => el)
      .sort((a, b) => a > b ? 1 : -1);
      
    this.imagesTmp = {};  
  }

  // exports data to specifed format
  async export(exporter) {
    if (!exporter) throw Error('exporter parameter not passed to web crawler export');
    await exporter.run({
      links: this.links,
      images: this.images,
    });
  }
  
}

module.exports = WebCrawler;