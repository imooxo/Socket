const express = require("express");
const http = require("http");
const app = express();
const socketIO = require("socket.io");

// HTTP 기반으로 서버 구축
const server = http.createServer(app);

// 소캣이 http 모듈로 생성된 서버에 동작
const io = socketIO(server);
const PORT = 8080;

app.set("view engine", "ejs");

app.get("/", (req,res) => {
    res.render("client");
});

// room.ejs
app.get("/room", (req,res) => {
    res.render("room");
});

io.on("connection", (socket) => {
    console.log("socket id >> ",socket.id);
    // socket.on("event_name", (arg1, arg2, arg3, cb) => {
    //     console.log(arg1); //hello
    //     console.log(arg2); //10
    //     console.log(arg3); // {name:"jade"}
    //     cb("응답~!");
    // });

    // 하나를 보낼때 on
    // socket.on("new_message", (message, cb) => {
    //     console.log(message);
    //     cb(message);
    // });

    // 전체를 보낼때 on emit
    socket.on("new_message", (message) => {
        io.emit("message_render", message);
    });

    socket.on("disconnect", () => {
        console.log(`${socket.id} 연결 종료`);
    });

    // ========================
    // room.ejs 채팅방 만들기
    // console.log("방 만들어지기 전,",socket.rooms);
    // 2. 클라이언트에게 방 이름을 전달 받아서 방 생성
    socket.on("join", (chatRoom) => {
        console.log(chatRoom);

        socket.join(chatRoom); // join(채팅방 이름) 이용해서 채팅방 만들기
        // console.log("방 만들고 나서", socket.rooms)
        socket.room = chatRoom; // 방 정보 넣기

    // 3. 내가 포함한 방 client에게 입장 메세지 전달
        // 나 빼고 내가 참여할 채팅방 모두에게 보여짐
        // socket.broadcast
        //     .to(chatRoom)
        //     .emit("userjoin", `[${socket.id}]님이 입장하셨습니다.`);

        // 나 포함 내가 참여한 채팅방 모두에게 보여짐
        io.to(chatRoom).emit("userjoin", `[${socket.id}]님이 입장하셨습니다.`)
    });

    // 6. 하나의 클라이언트에게 메세지를 받아서
    //    (특정 방의)전체 클라이언트에게 보낸다.
    socket.on("message",(message) => {
        console.log(message);
        io.to(socket.room).emit("message_toAll", message)
    });
});

server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
