import Http from '../../../interceptor/interceptor';

const getCourseLevel = async (params) => {
    try {
        const result = await Http.get('/CourseLevel/GetAllCourseLevel', { params });
        return result;
    } catch (error) {
        console.log(error);
    }
};

export default getCourseLevel;
