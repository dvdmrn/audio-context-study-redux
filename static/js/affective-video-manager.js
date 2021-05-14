import {getOrderedPlaylist} from './experiment-control.js';
import {shuffleArray, getElementWhenLoaded, updateVideoCounter} from "./helpers.js";
import { resetSliders, getResponses, populateSliders } from "./affective-rating-sliders.js";

const socket = io();

let video = document.getElementById("videoPlayer");
let playing = false;
video.onplaying = ()=>{ playing = true };
video.onpause = () => { playing = false };



let conditions = getOrderedPlaylist();
console.log(conditions)

shuffleArray(conditions);
let playList = conditions.map((e) => { return e.file })
console.log("conditions: ",conditions)
console.log("playlist: ", playList)

let vidIndex = 0;
let source = document.getElementById("vidSource")

let nextButton;

let pData = [];


getElementWhenLoaded("nextButton").then((button)=>{
    nextButton = button;
    nextButton.onclick = nextVideo
})



let loadVideo = (vidURL)=>{
    video.pause()
    source.src = vidURL
    video.load()
}

document.addEventListener('keydown', (event) =>{
    if(event.key===" "){
        toggleVideo()
    }
    if (event.key === "n") {
        nextVideo();
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
    nextButton.blur();

    let responses = getResponses();
    pData.push({
        audio:conditions[vidIndex].audio,
        viz:conditions[vidIndex].viz,
        env: conditions[vidIndex].env,
        file:conditions[vidIndex].file,
        responses:responses
    })
    console.log(pData)
    
    vidIndex++;
    
    updateVideoCounter(playList, vidIndex);

    if(vidIndex>=playList.length){
        // end of videos
        alert("End of section 1/3!")
        console.log(pData);
        socket.emit("saveData", pData, sessionStorage.getItem("pid"), "ratings")        
        window.location.href="env_task.html"
        }
    else{
        loadVideo("vids/rating/"+playList[vidIndex])
        resetSliders()
        }
}

populateSliders();
let button = document.getElementById("nextButton");
button.onclick = getResponses
sessionStorage.setItem("startTime",new Date().getTime())

loadVideo("vids/rating/"+playList[vidIndex])
updateVideoCounter(playList, vidIndex);
