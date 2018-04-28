import axios from 'axios';

export function fetch (method = 'GET', url, params, data) {
    return new Promise((resolve, reject) => {
        const options = {
            url: url,
            method: method,
            data: data,
            params: params,
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' }
        };
        axios(options)
            .then(res => {
                resolve(res.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

export function fetch3wForm (method, url, req) {
    const methods = method || 'GET';
    return new Promise((resolve, reject) => {
        const options = {
            url: url,
            method: methods,
            withCredentials: true,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        };

        if(methods == 'get') {
            options.params = req;    
        } else {
            options.data = req;
            options.transformRequest = [];
            options.transformRequest.push(function (data) {
            // Do whatever you want to transform the data
                let ret = '';
                for (const it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
                }
                return ret;
            });
        }

        axios(options).then(res => {
            resolve(res.data);
        }).catch(error => {
            reject(error);
        });
    });
};
