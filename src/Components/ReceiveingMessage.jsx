import React from "react";

export const ReceiveingMessage = ({ message }) => {
  return (
    <div className="received-msg">
      <div className="received-msg-inbox">
        <p className="single-msg">{message}</p>
        <span className="time">18:31 PM | July 24</span>
      </div>
    </div>
  );
};

export default ReceiveingMessage;
