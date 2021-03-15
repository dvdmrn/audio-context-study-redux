import { shuffleArray, updateVideoCounter } from "./helpers.js";
// import { populateEnvironments, removeDivs } from "./env-task.js";


const environments = [
    "busy street",
    "cat meowing",
    "construction site",
    "baby crying",
    "running water",
    "crickets",
    "party",
    "car repair center",
    "vacuuming",
    "nothing"
]



let envPlayList = [
    
    { file: "vids/env/env-cat-1.mp4", env: "cat meowing" },
    { file: "vids/env/env-cat-2.mp4", env: "cat meowing" },
    // { file: "vids/env/env-cat-3.mp4", env: "cat meowing" }, TODO: RE-EXPORT THIS ONE IT'S IN 1080 FOR SOME REASON
    { file: "vids/env/env-cat-4.mp4", env: "cat meowing" },
    { file: "vids/env/env-cat-4.mp4", env: "cat meowing" },

    { file: "vids/env/env-crickets-1.mp4", env: "crickets" },
    { file: "vids/env/env-crickets-2.mp4", env: "crickets" },
    { file: "vids/env/env-crickets-3.mp4", env: "crickets" },
    { file: "vids/env/env-crickets-4.mp4", env: "crickets" },

    { file: "vids/env/env-street-1.mp4", env: "busy street" },
    { file: "vids/env/env-street-2.mp4", env: "busy street" },
    { file: "vids/env/env-street-3.mp4", env: "busy street" },
    { file: "vids/env/env-street-4.mp4", env: "busy street" },

    { file: "vids/env/env-vacuum-1.mp4", env: "vacuuming" },
    { file: "vids/env/env-vacuum-2.mp4", env: "vacuuming" },
    { file: "vids/env/env-vacuum-3.mp4", env: "vacuuming" },
    { file: "vids/env/env-vacuum-4.mp4", env: "vacuuming" }

]

let video = document.getElementById("videoPlayer");
let playing = false;
video.onplaying = () => { playing = true };
video.onpause = () => { playing = false };


let playList;

let vidIndex = 0;
let source = document.getElementById("vidSource")


let pData = [];

// button functions --------------------------


let populateEnvironments = (target) => {
    let container = document.getElementById("env-selections");
    let targetIndex = Math.floor(Math.random() * 4)

    shuffleArray(environments);

    for (let i = 0; i < 4; i++) {

        let div = document.createElement("div")
        let environment = environments[i];

        // prevents duplicates
        if (environment === target) {
            environment = environments[4]
        }
        // ensures target is inserted
        if (i === targetIndex) {
            environment = target
        }

        div.textContent = environment
        div.classList.add("env-button")
        div.onclick = () => { selectedItem(environment, target) }
        container.appendChild(div)
    }
}

let selectedItem = (env, target) => {
    let response = {
        selected: env,
        target: target,
        correct: env === target,
        file:playList[vidIndex]
    }
    pData.push(response)
    console.log(response)
    nextVideo();
}

let removeDivs = () => {
    let divs = document.getElementsByClassName("env-button");
    for (let i = divs.length-1; i > -1; i--) {
        divs[i].remove();
    }
}






// ----------------------




let decimatePlayList = (inputArr) => {
    // ASSUME: playlist is not shuffled yet

        let workingArr = inputArr.slice(0)
        let reducedPlaylist = []
        for (let i = 0; i < 4; i++) {
            let segment = workingArr.splice(0, 4);
            shuffleArray(segment)
            segment.pop()
            shuffleArray(segment)
            segment.pop()
            reducedPlaylist.push(segment[0])
            reducedPlaylist.push(segment[1])
        }
        console.log(reducedPlaylist)
        return reducedPlaylist

 }



let loadVideo = (vidURL)=>{
    video.pause()
    source.src = vidURL
    video.load()
}

document.addEventListener('keydown', (event) =>{
    if(event.key===" "){
        toggleVideo()
    }
})

let toggleVideo = function(){
    if(playing){
        video.pause();
    }
    else{

        video.play()
    }
}

let nextVideo = () => {

    vidIndex++;
    updateVideoCounter(playList, vidIndex)

    if(vidIndex>=playList.length){
        // end of videos
        alert("You've reached the end of this section! You will now be prompted to download your data. It is a small text file. Please download it and follow the instructions at the end of the study to forward it to me")
        let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(pData));
        let dlAnchorElem = document.getElementById('downloadAnchorElem');
        dlAnchorElem.setAttribute("href", dataStr);
        dlAnchorElem.setAttribute("download", "env-task-data.json");
        dlAnchorElem.click();
        window.location.href="end.html"
        }
    else{
        loadVideo(playList[vidIndex])
        removeDivs()
        populateEnvironments(envPlayList[vidIndex].env)
        }
}




envPlayList = decimatePlayList(envPlayList);

shuffleArray(envPlayList)
playList = envPlayList.map(e => { return e.file })

console.log("env playlist: ", envPlayList)
populateEnvironments(envPlayList[0].env)
updateVideoCounter(playList, vidIndex)

loadVideo(playList[vidIndex])

export {nextVideo}