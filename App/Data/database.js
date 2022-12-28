import axios from 'axios';

class Database {
	getVoting({queryKey}) {
		const [_, votingcode] = queryKey;

		return axios.get('/api/votingm/', {
			params: {
				votingcode: votingcode,
			},
		});
	}

	checkCode({queryKey}) {
		const [_, votingcode] = queryKey;

		return axios.get('/api/checkcode/', {
			params: {
				votingcode: votingcode,
			},
		});
	}

	getProfile({queryKey}) {
		return axios.get('/api/selprofile/');
	}

	getKing({queryKey}) {
		const [_, votingcode] = queryKey;
		return axios.get('/api/selectionking/', {
			params: {
				votingcode: votingcode,
			},
		});
	}

	getQueen({queryKey}) {
		const [_, votingcode] = queryKey;
		return axios.get('/api/selectionqueen/', {
			params: {
				votingcode: votingcode,
			},
		});
	}

	voteKing(data) {
		return axios.post('/api/voteking/', data);
	}

	voteQueen(data) {
		return axios.post('/api/votequeen/', data);
	}

	uvk(data){
		// const [_,deviceid,votingcode] = queryKey;
		return axios.delete('/api/voteking/',{
			params:{
				votingcode:data.votingcode,
				deviceid:data.deviceid,
			}
		})
	}

	uvq(data){
		// const [_,deviceid,votingcode] = queryKey;
		return axios.delete('/api/votequeen/',{
			params:{
				votingcode:data.votingcode,
				deviceid:data.deviceid,
			}
		})
	}

	getVotedKing({queryKey}){
		const [_,votingcode,dvid] = queryKey;
		return axios.get('/api/voteking/',{
			params:{
				votingcode:votingcode,
				deviceid:dvid,
			}
		})
	}

	getVotedQueen({queryKey}){
		const [_,votingcode,dvid] = queryKey;
		return axios.get('/api/votequeen/',{
			params:{
				votingcode:votingcode,
				deviceid:dvid,
			}
		})
	}


	registerDevice(data) {
		return axios.post('/api/registerdevice/', data);
	}
}

export default new Database();
