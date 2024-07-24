import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import useGetAllUsers from "../../context/useGetAllUsers";
import useConversation from "../../zustand/useConversation";
import toast from "react-hot-toast";

function Search() {
  const [search, setSearch] = useState("");
  const [allUsers] = useGetAllUsers();
  const { setSelectedConversation } = useConversation();
  console.log(allUsers);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    const conversation = allUsers.find((user) =>
      user.fullname?.toLowerCase().includes(search.toLowerCase())
    );
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("User not found");
    }
  };

  return (
    <div className="h-[10vh] bg-gray-50 p-4 flex items-center">
      <form onSubmit={handleSubmit} className="flex w-full max-w-md mx-auto bg-white rounded-lg shadow-md">
        <div className="flex items-center w-full">
          <input
            type="text"
            className="w-full py-2 px-4 border border-gray-300 rounded-l-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className="bg-teal-500 text-white p-2 rounded-r-lg hover:bg-teal-600 transition duration-300 flex items-center justify-center"
          >
            <FaSearch className="text-xl" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default Search;
