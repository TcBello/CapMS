const webWidth: number = 992; //760

function goPage(url: string){
    window.location.href = url;
}

function showToast(toast: any, message: string){
    toast({
        message: message,
        duration: 1500,
        position: 'bottom',
        cssClass: 'custom-toast'
    });
}

export {webWidth, goPage, showToast};