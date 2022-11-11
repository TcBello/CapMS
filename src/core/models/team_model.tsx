import UserModel from "./user_model";

interface TeamModel{
    teamName: string,
    members: UserModel[]
};

function setTeamModel({teamName= "", members = [] as UserModel[]}){
    const teamModel: TeamModel = {
        teamName: teamName,
        members: members
    };

    return teamModel;
}

export { setTeamModel };
export default TeamModel;