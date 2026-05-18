import Http from '../../../interceptor/interceptor';

const GetAllCourses = async () => {
    try {
        const result = await Http.get('/Home/LandingReport');
        return result;
    } catch (error) {
        console.log(error);
    }
};

export default GetAllCourses;
