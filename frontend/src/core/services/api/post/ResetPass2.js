import http from '../../../interceptor/interceptor'

const ResetPass2 = async (payload) => {
    try {
        const result = await http.post('/Sign/Reset', payload);
        console.log(result);
        return result;
    }
    catch (err) {
        console.log(err);
    }

}
export default ResetPass2;