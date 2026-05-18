import http from '../../../interceptor/interceptor.js';


export const deleteNewsComments = async (NewsCommentId) => {
    try {
        const result = await http.delete(`/News/DeleteNewsComment?NewsCommandId=${NewsCommentId}`);
        console.log(result);
        return result;
    } catch (err) {
        console.log(err);
    }
};
