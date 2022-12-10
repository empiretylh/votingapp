import axios from 'axios';

class Database{

	getVoting({queryKey}){
		
		const [_,votingcode] = queryKey;
		
		return axios.get('/api/votingm/',{
			params:{
				votingcode:votingcode
			}
		})
	}


	checkCode({queryKey}){
		
		const [_,votingcode] = queryKey;
		
		return axios.get('/api/checkcode/',{
			params:{
				votingcode:votingcode
			}
		})
	}

	

	registerDevice(data){
		return axios.post('/api/registerdevice/',data);
	}

}

export default new Database();