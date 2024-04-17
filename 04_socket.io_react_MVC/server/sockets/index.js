const socketIO = require("socket.io");
function socketHandler(server) {
  const io = socketIO(server, {
    cors: {
      origin: "http://localhost:3000",
    },
  });

  const nickInfo = {};
  // {socket.id:닉네임1, socket.id: 닉네임2}
  io.on("connection", (socket) => {
    // io.emit("notice", `${socket.id}님이 입장하셨습니다.`);

    socket.on("checkNick", (nickname) => {
      // console.log(nickname);

      // Object.values= ['닉네임1','닉네임2']
      if (Object.values.includes(nickname)) {
        // 닉네임이 nickInfo에 있을 때[입장 실패]
        socket.emit("error", "이미 존재하는 닉네임입니다.");
      } else {
        // 닉네임이 nickInfo에 없을 때[입장 성공]
        // (1)일치하는게 없을 때, nickInfo에 닉네임정보 넣기
        nickInfo[socket.id] = nickname;
        // (2)입장 성공 닉네임 정보 클라이언트에게 전달
        socket.emit("entrySuccess", nickname);
        // (3)입장성공, 전체클라이언트에게 입장 알림 보내주기
        io.broadcast.emit(
          "notice",
          `${socket.id}님이 입장하셨습니다.`
        );
        // (4)입장성공, 전체 클라이언트에게 nickInfo전달
        io.emit("updateNicks", nickInfo);
      }
    });
  });
}

module.exports = socketHandler;