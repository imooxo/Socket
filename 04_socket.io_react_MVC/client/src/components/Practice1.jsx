import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io.connect("http://localhost:8080", { autoConnect: false });

export default function Practice1() {
  const [fromServerStr, setFromServerStr] = useState("");
  const initSocketConnect = () => {
    console.log(socket.connected);
    if (!socket.connected) socket.connect();
  };

  useEffect(() => {
    initSocketConnect();
  }, []);

  const hello = () => {
    socket.emit("hello", "hello");
    socket.on("hello2", (message) => {
      setFromServerStr("server: " + message);
    });
  };

  const study = () => {
    socket.emit("study", "study");
    socket.on("study2", (message) => {
      setFromServerStr("server: " + message);
    });
  };

  const bye = () => {
    socket.emit("bye", "bye");
    socket.on("bye2", (message) => {
      setFromServerStr("server: " + message);
    });
  };

  return (
    <>
      <button onClick={hello}>hello</button>
      <button onClick={study}>study</button>
      <button onClick={bye}>bye</button>
      <h3>{fromServerStr}</h3>
    </>
  );
}