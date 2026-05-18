import http from '../../../interceptor/interceptor.js';
export const deleteFavCourses = async (id) => {
    try {
        const formData = new FormData();
        formData.append('CourseFavoriteId', id);
        const result = await http.delete(
            '/Course/DeleteCourseFavorite',
            { data: formData },
            {
                'content-type': 'form-data',
            }
        );
        console.log(result);
        return result;
    } catch (err) {
        console.log(err);
    }
};
