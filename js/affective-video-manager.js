import {getOrderedPlaylist} from './experiment-control.js';
import {shuffleArray, getElementWhenLoaded, updateVideoCounter} from "./helpers.js";
import { resetSliders, getResponses } from "./affective-ratings.js";

let video = document.getElementById("videoPlayer");
let playing = false;
video.onplaying = ()=>{ playing = true };
video.onpause = () => { playing = false };



let conditions = getOrderedPlaylist();
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
        bg:conditions[vidIndex].bg,
        viz:conditions[vidIndex].viz,
        env:conditions[vidIndex].env,
        file:conditions[vidIndex].file,
        responses:responses
    })
    console.log(pData)
    
    vidIndex++;
    
    updateVideoCounter(playList, vidIndex);

    if(vidIndex>=playList.length){
        // end of videos
        alert("You've reached the end of this section! You will now be prompted to download your data. It is a small text file. Please download it and follow the instructions at the end of the study to forward it to me")
        let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(pData));
        let dlAnchorElem = document.getElementById('downloadAnchorElem');
        dlAnchorElem.setAttribute("href", dataStr);
        dlAnchorElem.setAttribute("download", "rating-task-data.json");
        dlAnchorElem.click();
        window.location.href="env_task.html"
        }
    else{
        loadVideo("vids/"+playList[vidIndex])
        resetSliders()
        }
}


loadVideo("vids/"+playList[vidIndex])
updateVideoCounter(playList, vidIndex);
