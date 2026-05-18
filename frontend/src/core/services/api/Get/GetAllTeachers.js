import Http from "../../../interceptor/interceptor";

const GetAllTeachers = async (params) => {
    try {
        const result = await Http.get(
            "/Home/GetTeachers",
            params 
        );
        return result;
    } catch (error) {
        console.log(error);
    }
};

export default GetAllTeachers;
