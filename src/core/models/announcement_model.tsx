import { Timestamp } from "firebase/firestore";

interface AnnouncementModel{
    by: string,
    message: string,
    date: Timestamp
};

function setAnnouncementModel({by = "", message = "", date = Timestamp.now()}){
    const announcementModel: AnnouncementModel = {
        by: by,
        message: message,
        date: date
    };

    return announcementModel;
}

export { setAnnouncementModel };
export default AnnouncementModel;