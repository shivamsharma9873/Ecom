const server = require("socket.io")(8000, {
    cors: "http://localhost:5500"
})
const users = {}
server.on("connect", (socket) => {
    socket.on("user-joined", name => {
        users[socket.id] = name
        socket.broadcast.emit("new-user-joined", name)
    })
    socket.on("disconnect", () => {
        socket.broadcast.emit("user-left", users[socket.id])
        delete users[socket.id]
    })
    socket.on("message-sent", message => {
        socket.broadcast.emit("receive-message", { message: message, name: users[socket.id] })
    })
})
    