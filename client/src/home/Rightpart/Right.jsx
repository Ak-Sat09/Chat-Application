import React, { useEffect } from "react";
import Chatuser from "./Chatuser";
import Messages from "./Messages";
import Typesend from "./Typesend";
import useConversation from "../../zustand/useConversation.js";
import { useAuth } from "../../context/AuthProvider.jsx";
import { CiMenuFries } from "react-icons/ci";

function Right() {
  const { selectedConversation, setSelectedConversation } = useConversation();
  useEffect(() => {
    return setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="w-full h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLwvC4OaprHLfu3XyHRrKUWOrUgAuY0GsNOg&s')" }}>
      <div className="flex flex-col h-full">
        {!selectedConversation ? (
          <NoChatSelected />
        ) : (
          <>
            <Chatuser />
            <div
              className="flex-1 overflow-y-auto"
              style={{ maxHeight: "calc(92vh - 8vh)" }}
            >
              <Messages />
            </div>
            <Typesend />
          </>
        )}
      </div>
    </div>
  );
}

export default Right;

const NoChatSelected = () => {
  const [authUser] = useAuth();

  return (
    <div className="flex h-full items-center justify-center bg-opacity-70 bg-gray-800 p-4 rounded-md">
      <div className="text-center text-white">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-ghost drawer-button lg:hidden absolute left-5"
        >
          <CiMenuFries className="text-gray-900 text-xl" />
        </label>
        <h1 className="text-xl font-semibold">
          Welcome{" "}
          <span className="font-bold text-2xl">{authUser.user.fullname}</span>
          <br />
          No chat selected, please start a conversation by selecting someone
          from your contacts
        </h1>
      </div>
    </div>
  );
};
