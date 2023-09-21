import { React, useState, useEffect } from "react";
import Messages from "./Messages";
import { send } from "../SignalR/connection";

const ChatInterface = (props) => {
  const [messages, setMesasges] = useState([
    {
      id: 1,
      type: "received",
      content: "test received message 1",
    },
    {
      id: 2,
      type: "outgoing",
      content: "test outgoing message 2",
    },
  ]);

  useEffect(() => {
    const messagePage = document.getElementById("msg-page");
    scrollToBottom(messagePage);
  }, [messages]);

  return (
    <div className="container">
      <div className="msg-header">
        <div className="container1">
          <div className="active">
            <p>User name</p>
          </div>
        </div>
      </div>

      <div className="chat-page">
        <div className="msg-inbox">
          <div className="chats">
            <div className="msg-page" id="msg-page">
              <Messages messages={messages} />
            </div>
          </div>

          <div className="msg-bottom">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Write message..."
                id="message-input"
              />
              <div className="input-group-append ">
                <span className="input-group-text send-icon ">
                  <button
                    className="send-message-button"
                    id="send-button"
                    onClick={() => addOutgoingMessage(messages, setMesasges)}
                  >
                    Send
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function addOutgoingMessage(messages, setMesasges) {
  const messageContent = document.getElementById("message-input").value;

  var messgeToAppend = {
    id: Math.max(...messages.map((msg) => msg.id)) + 1,
    type: "outgoing",
    content: messageContent,
  };
  setMesasges([...messages, messgeToAppend]);
  send({ message: messageContent });
  document.getElementById("message-input").value = "";
}

function scrollToBottom(element) {
  element.scrollTop = element.scrollHeight;
}

export default ChatInterface;
