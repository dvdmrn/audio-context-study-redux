

// const conditions = { background:["bg", "nobg"],
//                      visualization:["viz", "noviz"],
//                      environment:["dog","cafe","construction","forest"]
//                     }
// const clips = ["s1", "s2", "s3", "s4"]

// let getOrderedPlaylist = ()=>{
//     let combinations = []
//     for (let i = 0; i < conditions.background.length; i++) {
//         // const element = conditions.background[i];
//         for (let j = 0; j < conditions.visualization.length; j++) {
//             for (let k = 0; k < conditions.environment.length; k++) {
//                 // TODO: make it so that env==null when: nobg && noviz
//                 let env = conditions.environment[k];
//                 if (conditions.visualization[j] === "noviz" && conditions.background[i] === "nobg"){
//                     env = "null"
//                 }
//                 let fileName = conditions.visualization[j]+"-"+
//                                conditions.background[i]+"-"+
//                                env+"-"+
//                                clips[Math.floor(Math.random()*clips.length)]+".mp4"
//                 combinations.push({bg:conditions.background[i]==="bg",
//                                  viz:conditions.visualization[j]==="viz",
//                                  env:env,
//                                  file:fileName})
                                
//             }
//         }
//     }
    
//     return combinations

// }


const conditions = ["dog", "cafe", "construction", "forest"];
const clips = ["s1", "s2", "s3", "s4"]


let getOrderedPlaylist = ()=>{
    let combinations = []
    
    // audio && viz == true
    for (let i = 0; i < conditions.length; i++) {
        let fileName = "viz-bg-" +
                       conditions[i] + "-" +
                       clips[Math.floor(Math.random() * clips.length)] + ".mp4"
        combinations.push({
                       audio: true,
                       viz: true,
                       env: conditions[i],
                       file: fileName
        })
    }

    // audio == false
    for (let i = 0; i < conditions.length; i++) {
        let fileName =  "viz-nobg-" +
                        conditions[i] + "-" +
                        clips[Math.floor(Math.random() * clips.length)] + ".mp4"
        combinations.push({
                        audio: false,
                        viz: true,
                        env: conditions[i],
                        file: fileName
        })
    }

    // viz == off
    for (let i = 0; i < conditions.length; i++) {
        let fileName = "noviz-bg-" +
                        conditions[i] + "-" +
                        clips[Math.floor(Math.random() * clips.length)] + ".mp4"
        combinations.push({
                        audio: true,
                        viz: false,
                        env: conditions[i],
                        file: fileName
        })
    }

    // viz==off && audio==off

    for (let i = 0; i < conditions.length; i++) {
        let fileName = "noviz-nobg-null-" +
                       clips[i] + ".mp4"           
        combinations.push({
                        audio: true,
                        viz: false,
                        env: conditions[i],
                        file: fileName
        })
    }
        
    return combinations
        
}




export {getOrderedPlaylist}