import http from '../../../interceptor/interceptor.js';
export const getFavoriteNews = async () => {
    try {
        const result = await http.get('/SharePanel/GetMyFavoriteNews');
        console.log(result);
        return result;
    } catch (err) {
        console.log(err);
    }
};
