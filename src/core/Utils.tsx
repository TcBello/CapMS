import { format } from "date-fns";

const webWidth: number = 992;

const defaultImage = "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png";

function goPage(url: string){
    window.location.href = url;
}

function replacePage(url: string){
    window.location.replace(url);
}

function showToast(toast: any, message: string){
    toast({
        message: message,
        duration: 1500,
        position: 'bottom',
        cssClass: 'custom-toast'
    });
}

function getStorageData(key: string){
    return window.localStorage.getItem(key);
}

function setStorageData(key: string, value: string){
    window.localStorage.setItem(key, value);
}

function removeStorageData(key: string){
    window.localStorage.removeItem(key);
}

function clearStorageData(){
    window.localStorage.clear();
}

function openNewTab(url: string){
    window.open(url);
}

function goToGoogleMeet(meetingName: string){
    const newMeetingName = meetingName.replaceAll(" ", "");
    openNewTab(`https://accounts.google.com/AccountChooser/signinchooser?continue=https://g.co/meet/${newMeetingName}`);
}

function dateToMonthDateYear(date: Date){
    return format(date, "MMM d, yyyy");
}

export {
    webWidth,
    goPage,
    showToast,
    replacePage,
    getStorageData, 
    setStorageData,
    clearStorageData,
    removeStorageData,
    defaultImage,
    openNewTab,
    goToGoogleMeet,
    dateToMonthDateYear
};