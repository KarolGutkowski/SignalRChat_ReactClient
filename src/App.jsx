import { React, useState } from "react";
import { createRoot } from "react-dom/client";
import Messages from "./Messages";

const App = () => {
  const [messages, setMesasges] = useState([]);
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
                  <button className="send-message-button" id="send-button">
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

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
