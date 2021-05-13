let emotionWords = [
                    "Interested",
                    "Distressed",
                    "Excited",
                    "Upset",
                    "Strong",
                    "Guilty",
                    "Scared",
                    "Hostile",
                    "Enthusiastic",
                    "Proud"
                    ]




    // < div class="response-container" >
    //             <div class="word-label">Excited</div>
    //             <div class="range-label">1</div>
    //             <div class="slider-flex">
    //                 <input type="range" min="1" max="5" value="3" class="slider" step="1" id="excited"></input>
    //             </div>
    //             <div class="range-label">5</div>
    // </div>

                    
let populateSliders = () => {
    let masterContainer = document.getElementById("sliders");

    emotionWords.forEach(word => {
        let container = document.createElement("div");
        let wordLabel =  document.createElement("div");
        let range1 = document.createElement("div");
        let range2 = document.createElement("div");
        let sliderFlex = document.createElement("div");
        let slider = document.createElement("input");

        range1.textContent = "1"
        wordLabel.textContent = word; // innerText?
        range2.textContent = "5"
        slider.type = 'range';
        slider.value = 1;
        slider.min = 1;
        slider.max = 5;
        slider.step = 1;
        slider.id = word;

        container.classList.add("response-container")
        wordLabel.classList.add("word-label")
        range1.classList.add("range-label")
        range2.classList.add("range-label")
        sliderFlex.classList.add("slider-flex")
        slider.classList.add("slider");

        container.appendChild(wordLabel)
        container.appendChild(range1)
        container.appendChild(sliderFlex)
        container.appendChild(range2)

        sliderFlex.appendChild(slider)

        masterContainer.appendChild(container);

    });
    let nextButton = document.createElement("button");
    nextButton.textContent = "next";
    nextButton.id = "nextButton";
    nextButton.onclick = getResponses
    masterContainer.appendChild(nextButton)
}



let getResponses = () => {
    let sliders = document.getElementsByClassName("slider");
    let responses = {}
    for (let i = 0; i < sliders.length; i++) {
        console.log(sliders[i].id, Number(sliders[i].value));
        responses[sliders[i].id] = sliders[i].value;
    }
    return responses

}

let resetSliders = () => {
    let sliders = document.getElementsByClassName("slider");
    for (let i = 0; i < sliders.length; i++) {
        sliders[i].value = 1;
    }
}



export {getResponses, resetSliders, populateSliders};

