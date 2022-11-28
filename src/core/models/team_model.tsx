import UserModel from "./user_model";

interface TeamModel{
    teamName: string,
    members: UserModel[],
    uid: string,
    projectId: string,
};

function setTeamModel({teamName= "", members = [] as UserModel[], uid = "", projectId = ""}){
    const teamModel: TeamModel = {
        teamName: teamName,
        members: members,
        uid: uid,
        projectId
    };

    return teamModel;
}

export { setTeamModel };
export default TeamModel;