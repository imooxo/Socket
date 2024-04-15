const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const PORT = 8080;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("talk_dm");
});

const nickInfo = {};
// {socket..id: nickname} 형식으로 저장
// ex >> { '0558aw0H0L4erzS1AAAB': 'jade' }
io.on("connection", (socket) => {
    // [닉네임 사용2]
    // 닉네임 중복 체크 후 중복 아닐때만
    // nickInfo에 정보 추가
    socket.on("checkNick", (nickname)=> {
        nickInfo[socket.id] = nickname;
        console.log(nickInfo);
        console.log(Object.values(nickInfo));

        // ["a", "b", "c", "d"] indexOf("b") ===> 1이 반환됨
        // ["a", "b", "c", "d"] indexOf("f") ===> -1이 반환됨 (없는 닉네임이면 -1이 됨)
        //  지금 들어온 닉네임과 중복되는 값이 있는지 검사
        if(Object.values(nickInfo).indexOf(nickname)> -1){
            //중복된 데이터(-1혹은 같으면)
            //(1)입장 실패, 닉네임 중복 시 에러메세지를 클라이언트에 보낸다.
            socket.emit("error", "이미 존재하는 닉네임입니다.");
        }else{
            nickInfo[socket.id] = nickname //socketInfo에 nickname 정보 넣기
            //중복되지 않은 데이터(-1보다 작거나 같으면)
            //(2)입장성공, 나의 닉네임 정보 나에게 전달
            socket.emit("entrySuccess", nickname);
            //(3)입장성공, ~~~님이 입장하셨습니다. 알림메세지 전달 (나 제외)
            socket.broadcast.emit("notice", `${nickname}님이 입장하셨습니다.`);

            //(4)입장성공, 전체 클라이언트에게 updated nickInfo 전달 (나 포함)
            io.emit("updateNicks", nickInfo);
        }
    });

  /* [실습3] 입장-1 */
//   socket.broadcast.emit("notice", `${socket.id}님이 입장하셨습니다.`);
  
  /* [실습4] 채팅 주고받기 */
  // [4-2] 메세지를 전달을 받아서, 전체에게 메세지 뿌려주기
  socket.on("send", (message) => {
    console.log(`${socket.id}, ${message}`);
    io.emit("message", {id:socket.id, message:message});
  });
});

server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});