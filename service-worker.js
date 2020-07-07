self.addEventListener("install", (event) => {
});

self.addEventListener("activate", (event) => {
});

self.addEventListener("fetch", (event) => {
});

window.addEventListener("beforeinstallprompt", (event) => {
    event.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "dismissed") {
           console.log("取消安裝至桌面");
        } else {
           console.log("接受安裝至桌面");
        }
    });
});
