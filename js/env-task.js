// // import { shuffleArray } from "./helpers.js";
// // import { nextVideo } from "./env-video-manager.js";

// let environments = [
//     "busy street",
//     "cat meowing", 
//     "construction site",
//     "baby crying", 
//     "running water", 
//     "crickets", 
//     "party",
//     "car repair center", 
//     "vacuuming",
//     "nothing"
//     ]

// let pData = [];

// let populateEnvironments = (target) => {
//     let container = document.getElementById("env-selections");
//     let targetIndex = Math.floor(Math.random()*4)

//     shuffleArray(environments);

//     for (let i = 0; i < 4; i++) {
//         console.log("i: ",i,"target index: ",targetIndex, "target: ",target)
        
//         let div = document.createElement("div")
//         let environment = environments[i];

//         // prevents duplicates
//         if(environment===target){
//             environment = environments[4]
//         }
//         // ensures target is inserted
//         if(i===targetIndex){
//             environment = target
//         }
        
//         div.textContent = environment
//         div.classList.add("env-button")
//         div.onclick = ()=>{selectedItem(environment, target)}
//         container.appendChild(div)
//     }
// }

// let selectedItem = (env, target) =>{
//     let response = {
//         selected:env,
//         target:target,
//         correct:env===target
//     }
//     pData.push(response)
//     console.log(response)
//     // nextVideo();
// }

// let removeDivs = () => {
//     let divs = document.getElementsByClassName("env-button");
//     for (let i = 0; i < divs.length; i++) {
//         divs[i].remove();
//     }
// }

// export {environments, populateEnvironments, removeDivs}