

const conditions = { background:["bg", "nobg"],
                     visualization:["viz", "noviz"],
                     environment:["dog","cafe","construction","forest"]
                    }
const clips = ["s1", "s2", "s3", "s4"]

let getOrderedPlaylist = ()=>{
    let combinations = []
    for (let i = 0; i < conditions.background.length; i++) {
        // const element = conditions.background[i];
        for (let j = 0; j < conditions.visualization.length; j++) {
            for (let k = 0; k < conditions.environment.length; k++) {
                // TODO: make it so that env==null when: nobg && noviz
                let env = conditions.environment[k];
                if (conditions.visualization[j] === "noviz" && conditions.background[i] === "nobg"){
                    env = "null"
                }
                let fileName = conditions.visualization[j]+"-"+
                               conditions.background[i]+"-"+
                               env+"-"+
                               clips[Math.floor(Math.random()*clips.length)]+".mp4"
                combinations.push({bg:conditions.background[i]==="bg",
                                 viz:conditions.visualization[j]==="viz",
                                 env:env,
                                 file:fileName})
                                
            }
        }
    }
    
    return combinations

}

export {getOrderedPlaylist}