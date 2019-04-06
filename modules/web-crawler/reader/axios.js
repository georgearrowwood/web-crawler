const axios = require('axios');

class AxiosReader {
  constructor(host) {
    this.instance = axios.create({
      baseURL: host,
    });  
  }

  async read(uri) {
    try {
      const res = await this.instance.get(uri);
      return res.data;
    } catch (e) {
      console.log(e)
      return e;
    }
  }
};

module.exports = AxiosReader;