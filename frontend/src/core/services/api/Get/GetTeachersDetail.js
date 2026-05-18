import http from '../../../interceptor/interceptor.js';
export const getDetail = async (teacherId) => {
    try {
        const result = await http.get('/Home/GetTeacherDetails', {
            params: {
                TeacherId: teacherId || '',
            },
        });
        console.log(result);
        return result;
    } catch (err) {
        console.log(err);
    }
};
