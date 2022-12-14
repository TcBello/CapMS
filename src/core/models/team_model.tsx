import UserModel from "./user_model";

interface TeamModel{
    teamName: string,
    members: UserModel[],
    uid: string,
    projectId: string,
    projectTitle: string
};

function setTeamModel({teamName= "", members = [] as UserModel[], uid = "", projectId = "", projectTitle = ""}){
    const teamModel: TeamModel = {
        teamName: teamName,
        members: members,
        uid: uid,
        projectId: projectId,
        projectTitle: projectTitle
    };

    return teamModel;
}

export { setTeamModel };
export default TeamModel;