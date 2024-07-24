import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../context/useSendMessage.js";

function Typesend() {
  const [message, setMessage] = useState("");
  const { loading, sendMessages } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return; // Prevent sending empty messages
    await sendMessages(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-900 p-4 border-t border-gray-700">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 bg-gray-800 border border-gray-700 rounded-full py-2 px-4 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition duration-300"
          disabled={loading}
        >
          <IoSend className="text-xl" />
        </button>
      </div>
    </form>
  );
}

export default Typesend;
