const WebCrawler = require('./index');

describe('Test Main runner Class', () => {

  it('Throws error if initialized without reader param',  () => {
    expect(() => {
      new WebCrawler({ });
    }).toThrow('reader parameter not passed to web crawler constructor')
  });

  it('Throws error if initialized without parser param',  () => {
    expect(() => {
      new WebCrawler({ reader: 'test' });
    }).toThrow('parser parameter not passed to web crawler constructor')
  });

  it('WebCrawler initialized fine',  () => {
    new WebCrawler({ reader: 'test', parser: 'test' });
  });

  it('throws error if no uri given to parse',  async () => {
    const webcrawler = new WebCrawler({ reader: 'test', parser: 'test' });
    try {    
      await webcrawler.parse();
    } catch (e) {
      expect(e.message).toEqual('no uri given to parse')
    }  
  });

  it('when calling parse parsePage is triggered',  async () => {
    const webcrawler = new WebCrawler({ reader: 'test', parser: 'test' });
    webcrawler.parsePage = jest.fn();
    webcrawler.normalizeData = jest.fn();
    webcrawler.linksQueue = [1,2,3,4]
    await webcrawler.parse('test');
    expect(webcrawler.parsePage.mock.calls.length).toEqual(5);
    expect(webcrawler.parsePage.mock.calls[0][0]).toEqual('test');
  });

  
});    