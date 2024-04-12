const express = require("express");
const http = require("http");
const app = express();
const socketIO = require("socket.io");
const server = http.createServer(app);
const io = socketIO(server);
const PORT = 8181;

app.set("view engine", "ejs");

app.get("/", (req,res) => {
    res.render("client");
});

io.on("connection", (socket) => {
    console.log("server ok");

    // 해당 이벤트를 받고 콜백함수를 실행
    // socket.on("받을 이벤트 명", (msg)=>{...})
    socket.on("hello", (msg) => {
        console.log("client:", msg);
        io.emit("msg_render", msg, "안녕하세요");
    });
    socket.on("study", (msg) => {
        console.log("client:", msg);
        io.emit("msg_render", msg, "공부합시다");
    });
    socket.on("bye", (msg) => {
        console.log("client:", msg);
        io.emit("msg_render", msg, "잘가");
    });
});

server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})