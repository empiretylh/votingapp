import axios from 'axios';

const API_URL = 'https://csvote.pythonanywhere.com';

class Database {
  constructor() {
    axios.defaults.baseURL = API_URL;
  }

  async getVoting(votingcode) {
    if (votingcode) {
      return axios.get('/api/votingm/', {
        params: { votingcode },
      });
    }
  }

  async checkCode(votingcode) {
    return axios.get('/api/checkcode/', {
      params: { votingcode },
    });
  }

  async getProfile() {
    return axios.get('/api/selprofile/');
  }

  async getKing(votingcode) {
    return axios.get('/api/selectionking/', {
      params: { votingcode },
    });
  }

  async getQueen(votingcode) {
    return axios.get('/api/selectionqueen/', {
      params: { votingcode },
    });
  }

  async voteKing(data) {
    return axios.post('/api/voteking/', data);
  }

  async voteQueen(data) {
    return axios.post('/api/votequeen/', data);
  }

  async uvk(data) {
    return axios.delete('/api/voteking/', {
      params: {
        votingcode: data.votingcode,
        deviceid: data.deviceid,
      },
    });
  }

  async uvq(data) {
    return axios.delete('/api/votequeen/', {
      params: {
        votingcode: data.votingcode,
        deviceid: data.deviceid,
      },
    });
  }

  async getVotedKing(votingcode, dvid) {
    if (votingcode) {
      return axios.get('/api/voteking/', {
        params: {
          votingcode,
          deviceid: dvid,
        },
      });
    }
  }

  async getVotedQueen(votingcode, dvid) {
    if (votingcode) {
      return axios.get('/api/votequeen/', {
        params: {
          votingcode,
          deviceid: dvid,
        },
      });
    }
  }

  async getEndTime(votingcode) {
    if (votingcode) {
      return axios.get('/api/endtime/', {
        params: { votingcode },
      });
    }
  }

  async registerDevice(data) {
    return axios.post('/api/registerdevice/', data);
  }
}

const databaseInstance = new Database();
export default databaseInstance;
export { API_URL };
