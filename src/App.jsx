import { React } from "react";
import { createRoot } from "react-dom/client";
import ChatInterface from "./Components/ChatInterface";

const App = () => {
  return <ChatInterface />;
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
