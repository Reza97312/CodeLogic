import http from '../../../interceptor/interceptor.js';

export const replyCourseComment = async (courseId ,commentId, title, describe) => {
    try {
        const formData = new FormData();
        formData.append('CourseId', courseId);
        formData.append('CommentId', commentId)
        formData.append('Title', title);
        formData.append('Describe', describe);
        const result = await http.post(
            '/Course/AddReplyCourseComment',
            formData  
        );
        console.log(result);
        return result;
    } catch (err) {
        console.log(err);
    }
};