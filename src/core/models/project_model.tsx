import { Timestamp } from "firebase/firestore";
import ProjectFileModel from "./project_file_model";

interface ProjectModel{
    uid: string,
    title: string,
    status: string,
    files: ProjectFileModel[],
    proposedBy: string,
    created_at: Timestamp
};

function setProjectModel({uid = "", title = "", status = "Pending", files = [], proposedBy = "", created_at = Timestamp.now()}){
    const projectModel: ProjectModel = {
        uid: uid,
        title: title,
        status: status,
        files: files,
        proposedBy: proposedBy,
        created_at: created_at
    };

    return projectModel;
}

export { setProjectModel };
export default ProjectModel;