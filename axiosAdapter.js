import axios from 'axios';

const axiosAdapter = (config) => {
    const instance = axios.create(config);

    const processResult = async (instancer) => {
        let result = {};
        await instancer.catch(({response}) => response).
            then(({status, data}) => {
                result = {
                    ok: status < 300,
                    status,
                    json: () => new Promise((resolve) => resolve(data)),
                    text: () => new Promise((resolve) => resolve(data))
                };
            });
        return result;
    };

    return {
        get: (route, params) => processResult(instance.get(route, params)),
        delete: (route, params) => processResult(
            instance.delete(route, params)),
        post: (route, data, params) => processResult(
            instance.post(route, data, params)),
        patch: (route, data, params) => processResult(
            instance.patch(route, data, params))
    };
};

export default axiosAdapter;
