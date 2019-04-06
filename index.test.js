const exec = require('child_process').exec;

describe('Run script', () => {
  it('Throws error if run without host parameter',  (done) => {
    exec('npm run start', (err) => {
      expect(err.message).toMatch('Command failed: npm run start');
      done();
    });
  });

  it('Throws error if run without uri parameter',  (done) => {
    const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});
    exec('npm run start www.test.com', (err) => {
      expect(err.message).toMatch('Command failed: npm run start');
      done();
    });
  });
});    