export default function Speech({ chat }) {
    /* 
      {
        type: "me", //me, other, notice
        content: "내가 작성한 메세지",
      },
      {
        type: "other",
        content: "다른 사람이 작성한 메세지",
      },
      */
    return (
      <>
        <div className={`speech ${chat.type}`}>
          {chat.type === "other" && (
            <span className="nickname">nickname</span>
          )}
          <span className="msg-box">{chat.content}</span>
        </div>
      </>
    );
  }