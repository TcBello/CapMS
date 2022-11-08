import { createSlice } from "@reduxjs/toolkit";
import UserModel, { setUserModel } from "../../models/user_model";

const defaultImage = "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png";

// SELECT STUDENT INITIAL STATE
// const selectStudentInitialState: UserModel[] = [
    // setUserModel(
    //     {
    //         firstName: "First",
    //         lastName: "Member Name",
    //         image: defaultImage
    //     }
    // ),
//     setUserModel(
//         {
//             firstName: "Second",
//             lastName: "Member Name",
//             image: defaultImage
//         }
//     ),
//     setUserModel(
//         {
//             firstName: "Third",
//             lastName: "Member Name",
//             image: defaultImage
//         }
//     )
// ];

const selectStudentInitialState = {
    firstMember: setUserModel(
        {
            firstName: "First",
            lastName: "Member Name",
            image: defaultImage
        }
    ),
    secondMember: setUserModel(
        {
            firstName: "Second",
            lastName: "Member Name",
            image: defaultImage
        }
    ),
    thirdMember: setUserModel(
        {
            firstName: "Third",
            lastName: "Member Name",
            image: defaultImage
        }
    )
};

const selectStudentSlice: any = createSlice({
    name: "selectStudent",
    initialState: selectStudentInitialState,
    reducers: {
        selectFirstMember: (state, action) => {
            state.firstMember = action.payload as UserModel;
        },
        selectSecondMember: (state, action) => {
            state.secondMember = action.payload;
        },
        selectThirdMember: (state, action) => {
            state.thirdMember = action.payload;
        }
    }
});

export const { selectFirstMember, selectSecondMember, selectThirdMember } = selectStudentSlice.actions;

export default selectStudentSlice.reducer;