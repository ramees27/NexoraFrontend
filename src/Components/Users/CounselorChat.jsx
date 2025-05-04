import React, { useState } from 'react'

const mockMessages = [
    { id: 1, sender: "counselor", text: "Hi there! How can I assist you today?" },
    { id: 2, sender: "user", text: "I had a question about the session we had." },
    { id: 3, sender: "counselor", text: "Sure! Go ahead and ask." },
  ];
const CounselorChat = () => {
    const [messages, setMessages] = useState(mockMessages);
    const [newMessage, setNewMessage] = useState("");
    const handleSend = () => {
        if (!newMessage.trim()) return;
    
        const userMsg = {
          id: messages.length + 1,
          sender: "user",
          text: newMessage.trim(),
        };
    
        setMessages([...messages, userMsg]);
        setNewMessage("");
      };
    
   
  return (
    <div className="max-w-md mx-auto border rounded-lg shadow-lg p-4 bg-white h-[500px] flex flex-col mt-20">
      <h2 className="text-xl font-bold mb-4 text-center text-[#1a237e]">Counselor Chat</h2>

      <div className="flex-1 overflow-y-auto mb-4 space-y-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-xs ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-gray-200 text-gray-900 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default CounselorChat