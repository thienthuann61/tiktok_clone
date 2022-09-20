import * as httpRequest from '~/utils/httpRequest';

const searchService = async (q, type = 'less') => {
    try {
        const res = await httpRequest.get('users/search', {
            params: {
                q,
                type
            }
        })
        return res.data
    } catch (err) {
        console.log(err);
    }
}

export default searchService;