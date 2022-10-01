
const io = require("socket.io")(8000, {
    cors: {
        origin: "https//localhost:8000"
    }
});


const user = {};
io.on('connection', socket => {
    socket.on('new-user-joied', name => {
        user[socket.id] = name;
        socket.broadcast.emit('user-joind', name);
    });
    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: user[socket.id] });
    })


})
