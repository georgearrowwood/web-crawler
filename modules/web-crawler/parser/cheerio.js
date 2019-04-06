const cheerio = require('cheerio');

class CheerioParser {
  constructor() {
    this.parser = cheerio;
  }

  getElements(content, element) {
    return this.parser(element, content).toArray();
  }

  getElementsProps(content, element, propsToFind) {
    return this.getElements(content, element)
      .map(el => this.mapElement(el, propsToFind))
  }

  mapElement(el, propsToFind) {
    const props = {};
    if (propsToFind.htmlText) {
      props.text = this.parser(el).text();
    }
    if (propsToFind.href) {
      props.href = el.attribs.href;
    }
    if (propsToFind.src) {
      props.src = el.attribs.src;
    }
    return props;
  }
};

module.exports = CheerioParser;
