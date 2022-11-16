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

export {
    webWidth,
    goPage,
    showToast,
    replacePage,
    getStorageData, 
    setStorageData,
    clearStorageData,
    removeStorageData,
    defaultImage
};