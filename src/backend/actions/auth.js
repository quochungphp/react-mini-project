import axios from 'axios';
import * as actionTypes from '../constants/actionTypes';

let expiresIn = 7200;

export const actChangeNotify = (style, title, content) => {
	return {
		type : actionTypes.CHANGE_NOTIFY,
		style, title, content
	}
}

export const actHideNotify = () => {
	return {
		type : actionTypes.HIDE_NOTIFY,
	}
}

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (userToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        userToken: userToken,
        userId: userId
    };
};
export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const actLogin = (username, password) => {
	return dispatch => {
		dispatch(authStart());
        let url = "http://localhost:8000/v1/auth/login";
        const authData = {
            username: username,
            password: password
        };
		axios.post(url, authData)
		.then(response => {
            //console.log("response", response);
            if (response.data.status_code === 200) {
                
                const dataRespone = response.data.data;
                console.log("LoginAction", dataRespone)
                const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
                localStorage.setItem('userToken', dataRespone.user_token);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', dataRespone.id);
                console.log("LoginAction- localStorage", localStorage);
                dispatch(authSuccess(dataRespone.user_token, dataRespone.id));
                dispatch(checkAuthTimeout(expiresIn));
            } else {
                dispatch(authFail(response.data.msg));
            }
		})
		.catch(err => {
			dispatch(authFail(err.response.data.msg));
		});
	}
}
export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};
export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('userToken');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }   
        }
    };
};