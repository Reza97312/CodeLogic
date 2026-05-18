import http from '../../../interceptor/interceptor.js';
export const deleteFavNews = async (id) => {
    try {
        const result = await http.delete('/News/DeleteFavoriteNews', {
            data: { deleteEntityId: id },
        });
        console.log(result);
        return result;
    } catch (err) {
        console.log(err);
    }
};
