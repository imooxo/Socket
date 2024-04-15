const express = require("express");
const http = require("http");
// const socketIO = require("socket.io"); // sockets/index.js

const PORT = 8080;
const app = express();
const server = http.createServer(app);
const socketHandler = require("./sockets");
socketHandler(server); // 인자로 서버 보내기

// cors: 다른 서버에서 보내는 요청 제한
const cors = require("cors");
app.use(cors());


server.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
});