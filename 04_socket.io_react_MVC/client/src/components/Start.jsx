import { useEffect } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:8080", {
    autoConnect: false,
}); // 통신 연결
export default function Start() {
    const initSocketConnect = () => {
        console.log(socket.connected);
        if (!socket.connect) socket.connect(); // 클라이언트 소캣에 접속
        //console.log("after connect", socket.connected);
    };

    useEffect(() => {
        initSocketConnect();
        socket.emit("test", "테스트");
        socket.on("test2",(msg) => {
            console.log(msg);
        })
    }, []);
    return(
        <p>소캣 연결 테스트 입니다.</p>
    )
}