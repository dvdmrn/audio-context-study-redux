function shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function getElementWhenLoaded(elementID) {
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            let e = document.getElementById(elementID)
            if (e === null) {
                getElementWhenLoaded(elementID)
            }
            else {
                resolve(e)
            }
        }, 500)
    })
    ;
    
}

export {shuffleArray, getElementWhenLoaded}