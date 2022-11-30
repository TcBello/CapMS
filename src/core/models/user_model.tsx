import { defaultImage } from "../Utils";

interface UserModel{
    uid: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    course: string;
    srCode: string;
    image: string;
    role: string;
    status: string;
    projects: string[],
    advisees: string[]
}

function setUserModel({uid = "", firstName = "", lastName = "", email = "", password = "",
                        course = "", srCode = "", image = defaultImage, role = "", status = "",
                        projects = [] as string[], advisees = [] as string[]}){

    let userModel: UserModel = {
        uid: uid,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        course: course,
        srCode: srCode,
        image: image,
        role: role,
        status: status,
        projects: projects,
        advisees: advisees
    };

    return userModel;
}


export { setUserModel };
export default UserModel;