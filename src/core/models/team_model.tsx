import UserModel from "./user_model";

interface TeamModel{
    teamName: string,
    members: UserModel[],
    uid: string
};

function setTeamModel({teamName= "", members = [] as UserModel[], uid = ""}){
    const teamModel: TeamModel = {
        teamName: teamName,
        members: members,
        uid: uid
    };

    return teamModel;
}

export { setTeamModel };
export default TeamModel;