import { Timestamp } from "firebase/firestore";

interface ProjectFileModel{
    uid: string,
    fileName: string,
    gDocLink: string,
    created_at: Timestamp
};

function setProjectFileModel({uid = "", fileName = "", gDocLink = "", created_at= Timestamp.now()}){
    const projectFileModel: ProjectFileModel = {
        uid: uid,
        fileName: fileName,
        gDocLink: gDocLink,
        created_at: created_at
    };

    return projectFileModel
}

export { setProjectFileModel };
export default ProjectFileModel;