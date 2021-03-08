import fetchAdapter from './fetchAdapter.js';
import axiosAdapter from './axiosAdapter.js';

const createHttpClient = (client) => {
    const mapping = {
        axios: axiosAdapter,
        fetch: fetchAdapter
    };
    return mapping[client];
};

export default createHttpClient;
