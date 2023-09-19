import React from "react";

const Messages = ({ messages }) => {
  return messages.map((message) => {
    if (message.type === "received") {
      return <ReceiveingMessage key={message.id} message={message.content} />;
    } else {
      return <OutGoingMessage key={message.id} message={message.content} />;
    }
  });
};

const ReceiveingMessage = ({ message }) => {
  return (
    <div className="received-msg">
      <div className="received-msg-inbox">
        <p className="single-msg">{message}</p>
        <span className="time">18:31 PM | July 24</span>
      </div>
    </div>
  );
};

const OutGoingMessage = ({ message }) => {
  return (
    <div className="outgoing-chats">
      <div className="outgoing-msg">
        <div className="outgoing-chats-msg">
          <p>{message}</p>
          <span className="time">18:34 PM | July 24</span>
        </div>
      </div>
    </div>
  );
};

export default Messages;
