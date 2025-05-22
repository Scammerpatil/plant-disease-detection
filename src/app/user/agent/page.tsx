"use client";

import { useAuth } from "@/context/AuthProvider";
import { IconSend } from "@tabler/icons-react";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";

interface Message {
  role: "user" | "bot";
  content: string;
}

export default function ChatBotPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    axios.get("/api/chat-bot/start").then((res) => {
      setMessages([{ role: "bot", content: res.data.reply }]);
    });
  }, []);
  const sendMessage = async (e: any) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      setInput("");
      setIsLoading(true);
      const res = await axios.post("/api/chat-bot/chat", {
        message: input,
        history: messages,
      });
      setIsLoading(false);
      const botMessage: Message = { role: "bot", content: res.data.reply };

      setMessages((prev) => [...prev, botMessage]);
      setInput("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold mb-6 text-center uppercase">
        Agriscan-ai Leaf Disease Chatbot
      </h1>
      <div className="flex flex-col h-[calc(100vh-15rem)] max-w-2xl mx-auto border rounded-lg shadow-lg bg-base-200">
        <div className="h-[calc(100vh-13rem)] overflow-y-auto p-4 overflow-hidden">
          {messages.map((msg, index) => (
            <div
              className={`chat ${
                msg.role === "user" ? "chat-end" : "chat-start"
              }`}
              key={index}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  {msg.role === "bot" ? (
                    <img alt="BOT" src="/bot.png" />
                  ) : (
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src={user?.profileImage}
                    />
                  )}
                </div>
              </div>
              <div className="chat-bubble">
                <Markdown>{msg.content}</Markdown>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <Image src="/bot.png" alt="BOT" width={40} height={40} />
                </div>
              </div>
              <div className="chat-bubble">
                <span className="loading loading-dots loading-md"></span>
              </div>
            </div>
          )}
        </div>

        <form
          className="flex items-center justify-center mt-4"
          onSubmit={sendMessage}
        >
          <div className="join w-full">
            <input
              type="text"
              className="input input-primary w-full join-item"
              placeholder="Ask me about crop diseases..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              className="btn btn-primary p-3 join-item"
              onClick={sendMessage}
              type="submit"
            >
              <IconSend size={24} />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
