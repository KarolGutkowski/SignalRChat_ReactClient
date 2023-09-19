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
        <p className="single-msg">${message}</p>
        <span className="time">18:31 PM | July 24</span>
      </div>
    </div>
  );
};

const OutGoingMessage = ({ message }) => {
  return (
    <div class="outgoing-chats">
      <div class="outgoing-msg">
        <div class="outgoing-chats-msg">
          <p>${message}</p>
          <span class="time">18:34 PM | July 24</span>
        </div>
      </div>
    </div>
  );
};
