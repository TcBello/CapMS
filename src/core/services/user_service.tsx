import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase-setup/firebase-setup";
import TeamModel, { setTeamModel } from "../models/team_model";
import UserModel, { setUserModel } from "../models/user_model";

// TABLE COLLECTIONS
const userCollection = collection(db, "users");
const teamCollection = collection(db, "teams");
const announcementCollection = collection(db, "announcements");

async function getMyTeam(uid: string, userModel: UserModel) {
    try {
        // const docQuery = query(
        //     teamCollection,
        //     where("members", "array-contains", {
        //         uid: userModel.uid,
        //     })
        // );

        // const snapshot = await getDocs(docQuery);

        let myTeam: TeamModel = setTeamModel({});

        const snapshot = await getDocs(teamCollection);

        const teams = snapshot.docs.map((doc) => {
            let members = (doc.data()['members'] as []).map((member) => {
                return setUserModel({
                    uid: member['uid'],
                    firstName: member['first_name'],
                    lastName: member['last_name'],
                    email: member['email'],
                    course: member['course'],
                    srCode: member['sr_code'],
                    image: member['image'],
                    role: member['role'],
                    status: member['status'],
                })
            });

            return setTeamModel({
                teamName: doc.data()['team_name'],
                uid: doc.data()['uid'],
                members: members
            });
        });

        teams.map((team) => {
            return team.members.forEach((member) => {
                if(member.uid == uid){
                    myTeam = team;
                }
            });
        });

        return myTeam;
    }
    catch (e) {
        console.log(e);
    }
}

export {
    getMyTeam
};