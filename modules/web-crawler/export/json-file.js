const util = require('util');
const fs = require('fs');
const fsWriteFilePromise = util.promisify(fs.writeFile);

module.exports = {

  async run(data) {
    // output data format
    const jsonData = {
      meta: {
        totalLinks: data.links.length,
        totalImages: data.images.length,
      },
      links: data.links,
      images: data.images,
    };

    const jsonString = JSON.stringify(jsonData, null, 2);
    return await fsWriteFilePromise('out.json', jsonString, 'utf8');
  },
};
