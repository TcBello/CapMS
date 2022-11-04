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
}

function setUserModel({uid = "", firstName = "", lastName = "", email = "", password = "",
                        course = "", srCode = "", image = "", role = ""}){

    let userModel: UserModel = {
        uid: uid,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        course: course,
        srCode: srCode,
        image: image,
        role: role
    };

    return userModel;
}


export { setUserModel };
export default UserModel;