import {
  signalR,
  HubConnectionBuilder,
} from "@microsoft/signalr/dist/browser/signalr";

const serverAddress = "http://localhost:7152";
let nextId = 3;

export const appendNewMessageToChatInterface = ({
  message,
  setMessages,
  setNextId,
}) => {
  var messgeToAppend = {
    id: nextId++,
    type: "received",
    content: message,
  };

  setMessages((prevMessages) => {
    return [...prevMessages, messgeToAppend];
  });
};

export const initializeSignalRConnection = ({ setMessages, setNextId }) => {
  console.log("initializing connection");

  const connection = new HubConnectionBuilder()
    .withUrl(`${serverAddress}/chathub`, {
      withCredentials: true, // Allow credentials to be sent
    })
    .build();

  connection.on("ReceiveMessage", ({ message }) => {
    appendNewMessageToChatInterface({ message, setMessages, setNextId });
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

export const send = ({ userName, message }) => {
  if (!userName) var userName = "placeholder";

  fetch(`${serverAddress}/chathub/${userName}/newmessage`, {
    method: "POST",
    body: JSON.stringify({ message }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  internalConnectionVariable.invoke("NotifyNewMessage", {
    username: userName,
    message: message,
  });
};

export function addOutgoingMessage({ messages, setMessages }) {
  const messageContent = document.getElementById("message-input").value;

  var messgeToAppend = {
    id: nextId++,
    type: "outgoing",
    content: messageContent,
  };
  setMessages([...messages, messgeToAppend]);
  send({ message: messageContent });
  document.getElementById("message-input").value = "";
}

const notifyUserWritingMessage = () => {
  console.log("user writing message");

  connection.invoke("NotifyThatImWriting");
};
