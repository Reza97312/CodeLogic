import Http from '../../../interceptor/interceptor.js'

const getCourseById = async (courseId) => {
    try{
        const result = await Http.get(`/Home/GetCourseDetails?CourseId=${courseId}`)
        return result;
    }
    catch(error){
        console.log(error)
    }
}

export default getCourseById