// imports ============================================\\

// express --
const express = require('express')
const app = express()
var http = require('http').createServer(app);

app.use(express.static('static'))
const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Listening on port ${port}`))

// socket.io --
const io = require('socket.io')(server);

// file sys --
const fs = require('fs');


// globals ============================================\\
let pid = "P00"



// functions  ============================================\\
function saveData(data,type) {
    let dataStr = JSON.stringify(data);
    filename = pid + '-' + type + '.json';
    fs.writeFileSync("data/"+filename, dataStr);
}
// socket events ============================================\\

io.on('connection', (socket) => {
    socket.on("sendPID", newPID=>{
        console.log("recieved pID: ",newPID)
        pid = newPID
    })

    socket.on("saveData", (d, phase) => {
        saveData(d, phase);
    })
})

