const md5 = require("md5");
const mongoose = require("mongoose");

const chat = (io) => {
    io.on("connection", socket => {
        socket.on("disconnect", () => {
            socket.leave(socket.uuid);
            socket.leave(socket.conversation_id);
        })
    })
}

module.exports = chat;