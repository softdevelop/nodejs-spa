const {
    testChat,
} = require("./namespaces")

const _socket = (io) => {
    testChat(io.of("/chat"));
}

module.exports = _socket;