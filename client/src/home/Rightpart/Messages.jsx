import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessage from "../../context/useGetMessage.js";
import Loading from "../../components/Loading.jsx";
import useGetSocketMessage from "../../context/useGetSocketMessage.js";

function Messages() {
  const { loading, messages } = useGetMessage();
  useGetSocketMessage(); // Listing incoming messages

  const lastMsgRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      if (lastMsgRef.current) {
        lastMsgRef.current.scrollIntoView({
          behavior: "smooth",
        });
      }
    }, 100);
  }, [messages]);

  return (
    <div
      className="flex-1 overflow-y-auto bg-cover bg-center text-gray-100 p-4"
      style={{
        minHeight: "calc(92vh - 8vh)",
        backgroundImage: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaqBanhmhsDEGLgbfzW22NoHc6YFhFY91Rkg&s")', // Replace with your image URL
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {loading ? (
        <Loading />
      ) : (
        messages.length > 0 ? (
          messages.map((message) => (
            <div key={message._id} ref={lastMsgRef}>
              <Message message={message} />
            </div>
          ))
        ) : (
          <div className="text-center mt-10">
            <p className="text-gray-300">Say! Hi to start the conversation</p>
          </div>
        )
      )}
    </div>
  );
}

export default Messages;
