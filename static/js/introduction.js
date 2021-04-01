const socket = io();


let proceed = ()=>{
    let pid = document.getElementById("pIDfield").value
    let pidregex = /P\d+/i;
    let found = pid.match(pidregex);
    if(found){
        socket.emit("sendPID", pid);
        window.location.href = "calibration.html";
        return false;
    }
    else{
        alert("participant ids are in the form P01. Please enter a valid participant ID")
    }
    }

let nextButton = document.getElementById("nextButton");
nextButton.onclick = proceed
