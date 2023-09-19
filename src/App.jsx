import React from "react";
import { createRoot } from "react-dom/client";

const App = () => {
  return (
    <div class="container">
      <div class="msg-header">
        <div class="container1">
          <div class="active">
            <p>User name</p>
          </div>
        </div>
      </div>

      <div class="chat-page">
        <div class="msg-inbox">
          <div class="chats">
            <div class="msg-page" id="msg-page">
              <Messages />
            </div>
          </div>

          <div class="msg-bottom">
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                placeholder="Write message..."
                id="message-input"
                onInput="notifyUserWritingMessage()"
              />
              <div class="input-group-append ">
                <span class="input-group-text send-icon ">
                  <button
                    class="send-message-button"
                    onClick="send()"
                    id="send-button"
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

const container = document.getElementById("root");
const root = createRoot(container);
root.render(React.createElement(App));
