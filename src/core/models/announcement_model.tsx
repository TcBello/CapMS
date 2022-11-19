import { Timestamp } from "firebase/firestore";

interface AnnouncementModel{
    by: string,
    message: string,
    date: Timestamp,
    uid: string
};

function setAnnouncementModel({by = "", message = "", date = Timestamp.now(), uid = ""}){
    const announcementModel: AnnouncementModel = {
        by: by,
        message: message,
        date: date,
        uid: uid
    };

    return announcementModel;
}

export { setAnnouncementModel };
export default AnnouncementModel;