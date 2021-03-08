import fetch from 'node-fetch';

const fetchAdapter = (config) => {
    const {baseURL} = config;
    const prepareUrl = (route, params = {}) => {
        const myURL = new URL(route, baseURL);
        Object.entries(params).map(([k, v]) => myURL.searchParams.append(k, v));
        return myURL.href;
    };

    return {
        get: (route, {params, ...options}) => fetch(prepareUrl(route, params),
            options),
        delete: (route, {params, ...options}) => fetch(
            prepareUrl(route, params), {
                method: 'DELETE',
                ...options
            }),
        post: (route, params, options) => fetch(prepareUrl(route), {
            method: 'POST',
            body: JSON.stringify({...params, ...options.params})
        }),
        patch: (route, params, options) => fetch(prepareUrl(route), {
            method: 'PATCH',
            body: JSON.stringify({...params, ...options.params})
        })
    };
};

export default fetchAdapter;
