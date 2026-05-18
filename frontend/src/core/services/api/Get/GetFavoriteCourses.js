import http from '../../../interceptor/interceptor.js';
export const getFavoriteCourses = async () => {
    try {
        const result = await http.get('/SharePanel/GetMyFavoriteCourses');
        console.log(result);
        return result;
    } catch (err) {
        console.log(err);
    }
};
