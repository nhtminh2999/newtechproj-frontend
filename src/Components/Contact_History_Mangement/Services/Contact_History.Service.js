import { API_URL } from '../../../config';

export const Contact_History_Service = {
    search,
    getDataFilter,
    create,
    update,
    deleteModels
};

function search(searchModel) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const requestOptions = {
        headers,
        method: 'POST',
        body: JSON.stringify(searchModel)
    };
    return fetch(`${API_URL}/Contact_History/search`, requestOptions).then(handleResponse);
}

function getDataFilter(searchModel) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const requestOptions = {
        headers,
        method: 'POST',
        body: JSON.stringify(searchModel)
    };
    return fetch(`${API_URL}/Contact_History/getDataFilter`, requestOptions).then(handleResponse);
}

function create(contactHistoryModel) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const requestOptions = {
        headers,
        method: 'POST',
        body: JSON.stringify(contactHistoryModel)
    };
    return fetch(`${API_URL}/Contact_History/create`, requestOptions).then(handleResponse);
}

function update(contactHistoryModel) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const requestOptions = {
        headers,
        method: 'POST',
        body: JSON.stringify(contactHistoryModel)
    };
    return fetch(`${API_URL}/Contact_History/update`, requestOptions).then(handleResponse);
}

function deleteModels(listDelete) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const requestOptions = {
        headers,
        method: 'POST',
        body: JSON.stringify(listDelete)
    };
    return fetch(`${API_URL}/Contact_History/deleteModels`, requestOptions).then(handleResponse);
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




