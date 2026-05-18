import http from '../../../interceptor/interceptor';

export const securitySet = async (payload) => {
    try {
        const result = await http.post('/SharePanel/ChangePassword', payload);
        console.log(result);
        return result;
    } catch (err) {
        console.log(err);
    }
};
