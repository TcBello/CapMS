import { Timestamp } from "firebase/firestore";

interface ProjectFileModel{
    uid: string,
    fileName: string,
    gDocLink: string,
    created_at: Timestamp,
    status: string
};

function setProjectFileModel({uid = "", fileName = "", gDocLink = "", created_at= Timestamp.now(), status = ""}){
    const projectFileModel: ProjectFileModel = {
        uid: uid,
        fileName: fileName,
        gDocLink: gDocLink,
        created_at: created_at,
        status: status
    };

    return projectFileModel
}

export { setProjectFileModel };
export default ProjectFileModel;