import axios from "axios";

const request = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
});

export const get = async (api, option = {}) => {
    const res = await request.get(api, option);

    return res.data
}

export default request;
