import { API_URL } from '../../../config';

export const User_Service = {
    login,
}

function login(userModel) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const requestOptions = {
        headers,
        method: 'POST',
        body: JSON.stringify(userModel)
    };
    return fetch(`${API_URL}/User/login`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    const responseStatusCode = 401;
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === responseStatusCode) {
                // auto logout if 401 response returned from api
                //logout();
                window.location.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}