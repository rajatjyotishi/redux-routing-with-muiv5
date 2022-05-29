/*
NOTE: Use { forceUpdate: true	} when don't want to cache Api calls
NOTE: Uncomment following when implementing Authentication
*/
import { axios } from "./config";
// import { path } from './path';

export function sampleApi({ parameters }) {
  return axios.get("", { params: { parameters } });
}

// export function login({ username, password, rememberMe }) {
// 	let token = TOKEN;
// 	if (rememberMe) {
// 		// eslint-disable-next-line no-underscore-dangle
// 		windowStore._storage = 'localStorage';
// 		token = LL_TOKEN;
// 	}
// 	return axios
// 		.post(`${path.AUTHENTICATE}?${qs.stringify({ username, password })}`, {
// 			forceUpdate: true
// 		})
// 		.then((response) => {
// 			windowStore.setItem(token, response.token);
// 			return response;
// 		});
// }

// export function logout() {
// 	return axios.get(path.LOGOUT).then((response) => {
// 		delete axios.defaults.params.account_id;
// 		delete axios.defaults.headers['x-session-token'];
// 		return response;
// 	});
// }

// export function fetchTokenInfo() {
// 	axios.defaults.headers['x-session-token'] = windowStore.getToken();
// 	return axios
// 		.get(path.TOKEN_INFO, { params: { token_request: true }, forceUpdate: true })
// 		.then((response) => {
// 			axios.defaults.params.account_id = getAccountId(response);
// 			windowStore.setToken(response.token);
// 			return response;
// 		})
// 		.catch((error) => {
// 			delete axios.defaults.params.account_id;
// 			delete axios.defaults.headers['x-session-token'];
// 			return Promise.reject(error);
// 		});
// }
