const socketIO = require("socket.io");
function socketHandler(server) {
  // server: app.js에서 http 기반 서버 전달받을 예정
  // cors: 다른 서버에서 보내는 요청 제한
  const io = socketIO(server, {
    cors: {
      origin: "http://localhost:3001", // react server와 통신하기 위함
    },
  });

  io.on("connection", (socket) => {
    socket.on("test", (message) => {
      console.log(message);
      socket.emit("test2", "잘 받았습니다.");
    });

    socket.on("disconnect", () => {
      // 클라이언트 연결 해제
    });

    socket.on("hello", (message) => {
      console.log("client:", message);
      socket.emit("hello2", "안녕하세요");
    });

    socket.on("study", (message) => {
      console.log("client:", message);
      socket.emit("study2", "공부합시다");
    });

    socket.on("bye", (message) => {
      console.log("client:", message);
      socket.emit("bye2", "잘가~");
    });
  });
}

module.exports = socketHandler;