const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

const app = express();

const server = http.createServer(app);
const io = socketIO(server, {
    cors : {
        origin : "*",
        methods : ['GET', 'POST']
    }
})

app.use(cors('*'));
app.use(express.json());

app.post('/send', (req, res) => {
    const msg = req.body.message;
    console.log(msg);

    io.emit('pushNotification', {
        msg
    })
    res.status(200).send({
        message : "message sent successfully"
    })

    io.on('connection', (socket) => {
        console.log('Connectied');
        socket.on('disconnect', () => {
            console.log("Client disconnected")
        })
    })
});

server.listen(3000, () => {
    console.log('server listening at port 3000')
})