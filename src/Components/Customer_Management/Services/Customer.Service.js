import { API_URL } from '../../../config';
import Cookies from 'js-cookie';

export const Customer_Service = {
    search,
    getDataFilter,
    create,
    update,
    deleteModels
};

function search(searchModel) {
    const headers = new Headers();
    const token = Cookies.get('access_token');
    headers.append('Authorization', token);
    headers.append('Content-Type', 'application/json');
    const requestOptions = {
        headers,
        method: 'POST',
        body: JSON.stringify(searchModel)
    };
    return fetch(`${API_URL}/Customer/search`, requestOptions).then(handleResponse);
}

function getDataFilter(searchModel) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const requestOptions = {
        headers,
        method: 'POST',
        body: JSON.stringify(searchModel)
    };
    return fetch(`${API_URL}/Customer/getDataFilter`, requestOptions).then(handleResponse);
}

function create(customerModel) {
    const headers = new Headers();
    const token = Cookies.get('access_token');
    headers.append('Authorization', token);
    headers.append('Content-Type', 'application/json');
    const requestOptions = {
        headers,
        method: 'POST',
        body: JSON.stringify(customerModel)
    };
    return fetch(`${API_URL}/Customer/create`, requestOptions).then(handleResponse);
}

function update(customerModel) {
    const headers = new Headers();
    const token = Cookies.get('access_token');
    headers.append('Authorization', token);
    headers.append('Content-Type', 'application/json');
    const requestOptions = {
        headers,
        method: 'POST',
        body: JSON.stringify(customerModel)
    };
    return fetch(`${API_URL}/Customer/update`, requestOptions).then(handleResponse);
}

function deleteModels(listDelete) {
    const headers = new Headers();
    const token = Cookies.get('access_token');
    headers.append('Authorization', token);
    headers.append('Content-Type', 'application/json');
    const requestOptions = {
        headers,
        method: 'POST',
        body: JSON.stringify(listDelete)
    };
    return fetch(`${API_URL}/Customer/deleteModels`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    const responseStatusCode = 401;
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === responseStatusCode) {
                Cookies.remove('access_token');
                Cookies.remove('user_id');
                Cookies.remove('user_fullname');
                window.location.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}




