import Http from '../../../interceptor/interceptor';

const GetCoursesPaginate = async (params) => {
    try {
        const result = await Http.get('/Home/GetCoursesWithPagination', {
            params: {
                PageNumber: params.currentPage || 1,
                RowsOfPage: params.coursesPerPage || '',
                Query: params.query || '',
                TeacherId: params.teacherId || '',
            },
        });
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
};

export default GetCoursesPaginate;
