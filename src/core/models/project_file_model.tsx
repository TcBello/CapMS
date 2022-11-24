import { Timestamp } from "firebase/firestore";

interface ProjectFileModel{
    fileName: string,
    gDocLink: string,
    created_at: Timestamp
};

function setProjectFileModel({fileName = "", gDocLink = "", created_at= Timestamp.now()}){
    const projectFileModel: ProjectFileModel = {
        fileName: fileName,
        gDocLink: gDocLink,
        created_at: created_at
    };

    return projectFileModel
}

export { setProjectFileModel };
export default ProjectFileModel;