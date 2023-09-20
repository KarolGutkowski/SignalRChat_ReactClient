import React from "react";
import { ReceiveingMessage } from "./ReceiveingMessage";
import { OutGoingMessage } from "./OutGoingMessage";

const Messages = ({ messages }) => {
  return messages.map((message) => {
    if (message.type === "received") {
      return <ReceiveingMessage key={message.id} message={message.content} />;
    } else {
      return <OutGoingMessage key={message.id} message={message.content} />;
    }
  });
};

export default Messages;
