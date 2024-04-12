const express = require("express");
const ws = require("ws");
const app = express();
const PORT = 8080;

app.set("view engine", "ejs");

app.get("/",(req,res)=>{
    res.render("client");
});

app.listen(PORT, ()=>{
    console.log(`http://localhost:${PORT}`);
});

console.log(server); // Server 객체

// 웹소캣 서버 접속
const wsServer = new ws.Server({server}); //{서버 객체 넣기}

const sockets = []; //클라이언트들을 담을 배열

// return string
// 현재 시간관련 타임스탬프와 랜덤 문자열을 결합 > 고유 식별자 생성
function generateUniqueId(){
    //타임스탬프
    const timestamp = Date.now().toString(); // 36진수로 반환한 문자열

    //랜덤 문자열
    const randomString = Math.random().toString(36).substring(2);
    //"abcdef".substring(2); //2번 index부터 끝 index까지 반환

    return timestamp + randomString; // ex > luw0qu0rpc2c6cb0x
}

/*
    ws모듈(설치 필요)의 이벤트
    - connection: 클라이언트의 웹소캣 버서와 연결되어을 때 
    - message: 클라이언트로부터 메세지를 받았을 때
    - error: 연결중에 오류가 났을때
    - close: 클라이언트와 연결 종료
*/

wsServer.on("connection", (socket) => {
    console.log(socket); // (하나의) 클라이언트에 대한 소캣 정보
    console.log("connection?!?!");
    const clientId = generateUniqueId();
})