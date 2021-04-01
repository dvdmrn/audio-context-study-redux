import { shuffleArray, updateVideoCounter } from "./helpers.js";
// import { populateEnvironments, removeDivs } from "./env-task.js";

const socket = io();

const environments = [
    { name: "cat meowing", features: { organic: 1, artificial: 0, exterior: 1, interior: 1 } },
    { name: "crickets", features: { organic: 1, artificial: 0, exterior: 1, interior: 0 } },
    { name: "busy street", features: { organic: 1, artificial: 1, exterior: 1, interior: 0 } },
    { name: "vacuuming", features: { organic: 0, artificial: 1, exterior: 0, interior: 1 } },
    { name: "construction site", features: { organic: 0, artificial: 1, exterior: 1, interior: 0 } },
    { name: "baby crying", features: { organic: 1, artificial: 0, exterior: 0, interior: 1 } },
    { name: "running water", features: { organic: 1, artificial: 0, exterior: 1, interior: 0 } },
    { name: "party", features: { organic: 1, artificial: 0, exterior: 0, interior: 1 } },
    { name: "car repair center", features: { organic: 0, artificial: 1, exterior: 0, interior: 1 } },
    { name: "nothing", features: { organic: 0, artificial: 0, exterior: 0, interior: 0 } },
]



let envPlayList = [
    
    // cat meowing
    { file: "vids/env/env-cat-1.mp4", env: environments[0] },  
    { file: "vids/env/env-cat-2.mp4", env: environments[0] },
    // { file: "vids/env/env-cat-3.mp4", env: "cat meowing" }, TODO: RE-EXPORT THIS ONE IT'S IN 1080 FOR SOME REASON
    { file: "vids/env/env-cat-4.mp4", env: environments[0] },
    { file: "vids/env/env-cat-4.mp4", env: environments[0] },

    // crickets
    { file: "vids/env/env-crickets-1.mp4", env: environments[1] },
    { file: "vids/env/env-crickets-2.mp4", env: environments[1] },
    { file: "vids/env/env-crickets-3.mp4", env: environments[1] },
    { file: "vids/env/env-crickets-4.mp4", env: environments[1] },

    // busy street
    { file: "vids/env/env-street-1.mp4", env: environments[2] },
    { file: "vids/env/env-street-2.mp4", env: environments[2] },
    { file: "vids/env/env-street-3.mp4", env: environments[2] },
    { file: "vids/env/env-street-4.mp4", env: environments[2] },

    // vacuum
    { file: "vids/env/env-vacuum-1.mp4", env: environments[3] },
    { file: "vids/env/env-vacuum-2.mp4", env: environments[3] },
    { file: "vids/env/env-vacuum-3.mp4", env: environments[3] },
    { file: "vids/env/env-vacuum-4.mp4", env: environments[3] }

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
    console.log("target: ",target)
    let container = document.getElementById("env-selections");
    let targetIndex = Math.floor(Math.random() * 4)

    shuffleArray(environments);

    for (let i = 0; i < 4; i++) {

        let div = document.createElement("div")
        let environment = environments[i];

        // prevents duplicates
        if (environment.name === target.env.name) {
            environment = environments[4]
        }
        
        // ensures target is inserted
        if (i === targetIndex) {
            environment = target.env
        }
        
        div.textContent = environment.name
        div.classList.add("env-button")
        div.onclick = () => { selectedItem(environment, target.env) }
        container.appendChild(div)
    }
}

let selectedItem = (env, target) => {
    let response = {
        selected: env,
        target: target,
        correct: env.name === target.name,
        file:playList[vidIndex]
    }
    console.log("response: ",response)
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
    // selects 2 segments from each condition (so there isn't 4xConditions # of videos)

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
        socket.emit("saveData",pData, sessionStorage.getItem("pid"),"env")
        alert("End of section 2/3!")
        window.location.href="feedback.html"
        }
    else{
        loadVideo(playList[vidIndex])
        removeDivs()
        populateEnvironments(envPlayList[vidIndex])
        }
}




envPlayList = decimatePlayList(envPlayList);

shuffleArray(envPlayList)
playList = envPlayList.map(e => { return e.file })

console.log("env playlist: ", envPlayList)
populateEnvironments(envPlayList[0])
updateVideoCounter(playList, vidIndex)

loadVideo(playList[vidIndex])

export {nextVideo}