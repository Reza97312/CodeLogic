import http from '../../../interceptor/interceptor.js';


export const deleteCoursesComments = async (courseCommentId) => {
    try {
        const result = await http.delete(`/Course/DeleteCourseComment?CourseCommandId=${courseCommentId}`);
        console.log(result);
        return result;
    } catch (err) {
        console.log(err);
    }
};
