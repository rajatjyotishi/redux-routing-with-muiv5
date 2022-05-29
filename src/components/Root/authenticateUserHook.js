/* eslint-disable */
import React from 'react';
import { fetchTokenInfo } from 'redux/actions';
import { useDispatch } from 'react-redux';
import { windowStore } from 'util/windowStore';

export const useAuthenticateUser = (user) => {
	const dispatch = useDispatch();
	const token = windowStore.getToken();
	const [isRefreshingToken, setIsRefreshingToken] = React.useState(Boolean(token));

	React.useEffect(async () => {
		if (!user.authenticated && token) {
			const res = await dispatch(fetchTokenInfo());
			if (fetchTokenInfo.fulfilled.match(res)) {
				setIsRefreshingToken(false);
			}
		}
	}, []);

	return { isRefreshingToken };
};
