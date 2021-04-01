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



// functions  ============================================\\
function saveData(data, pid, type) {
    console.log("saving data: ",pid," : ",type);
    let dataStr = JSON.stringify(data);
    filename = pid + '-' + type + '.json';
    fs.writeFileSync("data/"+filename, dataStr);
}
// socket events ============================================\\

io.on('connection', (socket) => {

    console.log('client connected', socket.id)
    socket.on("saveData", (d, pid, phase) => {
        saveData(d, pid, phase);
        
    })
})

