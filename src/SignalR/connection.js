import {
  signalR,
  HubConnectionBuilder,
} from "@microsoft/signalr/dist/browser/signalr";

const serverAddress = "http://localhost:7152";

export const appendNewMessageToChatInterface = (userName, message) => {
  const messageInbox = document.getElementById("msg-page");
  const receivedMsg = document.createElement("div");
  receivedMsg.className = "received-msg";
  receivedMsg.innerHTML = `<div class="received-msg-inbox">
                                  <p class="single-msg">${message}</p>
                                  <span class="time">18:31 PM | July 24</span>
                              </div>`;
  messageInbox.appendChild(receivedMsg);
};

export const initializeSignalRConnection = (chatRoomName) => {
  const connection = new HubConnectionBuilder()
    .withUrl(`${serverAddress}/chathub`, {
      withCredentials: true, // Allow credentials to be sent
    })
    .build();

  connection.on("ReceiveMessage", ({ userName, message }) => {
    appendNewMessageToChatInterface(userName, message);
  });

  let timerId;

  connection.on("ReceiveSomeoneWriting", () => {
    const notifyUserWriting = document.getElementById(
      "another-user-writing-notifiaction",
    );
    console.log("someone writing");
    notifyUserWriting.classList.remove("hidden");
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      notifyUserWriting.classList.add("hidden");
    }, 1500);
  });

  connection.on("GetAllMessages", async (allMessages) => {
    for (let msg of allMessages) {
      await appendNewMessageToChatInterface(msg.userName, msg.message);
    }
  });

  connection.start().catch((err) => console.error(err.toSring()));
  return connection;
};

const connection = initializeSignalRConnection();

export const send = ({ userName, message }) => {
  if (!userName) var userName = "placeholder";

  fetch(`${serverAddress}/chathub/${userName}/newmessage`, {
    method: "POST",
    body: JSON.stringify({ message }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  connection.invoke("NotifyNewMessage", {
    username: userName,
    message: message,
  });
};

const notifyUserWritingMessage = () => {
  console.log("user writing message");

  connection.invoke("NotifyThatImWriting");
};
