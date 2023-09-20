import React from "react";

export const OutGoingMessage = ({ message }) => {
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

export default OutGoingMessage;
